# Dependencies

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
from flask import Flask, jsonify

import pandas as pandas
import numpy as np

# Set up the database.

engine = create_engine("sqlite:///belly_button_biodiversity.sqlite")

# Reflect the existing database.
Base = automap_base()

#Reflect the tables.
Base.prepare(engine, reflect = True)

# Save references to each table.

OTU = Base.classes.otu
Samples = Base.classes.samples
Metadata = Base.classes.samples_metadata

# Create our session (link) from Python to the DB
session = Session(engine)


# Flask Setup

app = Flask(__name__)

# Flask Routes

@app.route("/")
def home():
	return(
		f"Welcome to the Belly Button Biodiversity API</br>"
		f"Available Routes:</br"
		f"/api/v1.0/names</br>"
		f"/api/v1.0/otu</br>"
		f"/api/v1.0/metadata/<sample></br>"
		f"/api/v1.0/wfreq/<sample></br"
		f"/api/v1.0/sample/<sample></br>")


@app.route("/names")
#List of sample names.
def sample_names():
	samples_list = Samples.__table__.columns.keys()
	return jsonify(samples_list)

@app.route("/otu")
#List of OTU descriptions.
def otu_data():
	results = session.query(OTU.otu_id, OTU.lowest_taxonomic_unit_found).order_by(OTU.otu_id).all()
	otu_data = list(np.ravel(results))
	return jsonify(otu_data)

@app.route("/metadata/<sample>")
#Metadata for a given sample.
def metadata_route(sample):
	# sample = "BB_940"
	num_sample = sample.replace("BB_", "")
	metadata_sample = session.query(Metadata.AGE, Metadata.BBTYPE, Metadata.ETHNICITY, Metadata.GENDER, Metadata.LOCATION, Metadata.SAMPLEID).filter_by(SAMPLEID=num_sample).all()
	record = metadata_sample[0]
	metadata_dict = {"Age": record[0], 'BB_Type':record[1], 'Ethnicity': record[2],'Gender': record[3], 'Location': record[4], 'Sample_ID': record[5]}
	return metadata_dict

	sample_result = metadata_route("BB_940")
	return jsonify(sample_result)

@app.route("/wfreq/<sample>")
#Weekly Washing frequency as a number.
def wfreq_route(sample):
	num_w_sample = sample.replace("BB_", "")
	wfreq_sample = session.query(Metadata.SAMPLEID, Metadata.WFREQ).filter_by(SAMPLEID = num_w_sample).all()
	w_record = wfreq_sample[0]
	wfreq_dict = {'Sample ID' : w_record[0], 'Wash Frequency' : w_record[1]}
	wfrequency = wfreq_dict['Wash Frequency']
	return wfrequency

	wfreq_results = wfreq_route('BB_940')
	return jsonify(wfreq_results)

@app.route("/sample/<sample>")
def otu_sample_values(sample):
    otu_ids = []
    sample_values = []
    sample_query = "Samples." + sample
    results = session.query(Samples.otu_id, sample_query).order_by(desc(sample_query))
    for result in range(len(results)):
        otu_ids.append(results[0])
    for result in range(len(results)):
         sample_values.append(results[1])
    return otu_ids
    return sample_values
    sample_values_dict = {'otu_id': otu_id, 'sample_values': sample_values}

    return jsonify(samples_value_dict)


if __name__ == "__main__":
	app.run(debug=True)


