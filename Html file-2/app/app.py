import pickle
import sklearn
from flask import Flask, request, render_template
import json
import numpy as np

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/result', methods=['POST'])
def getvalue():
    x = request.form['values']
    values=[]
    values.append(x)
    prediction=model.predict(values)
    answer = v[prediction[0]]
    print(answer)
    return render_template('pass.html', ans=answer)

@app.route('/login')
def login():
    return  render_template('login.html')

@app.route('/index1')
def index1():
    return  render_template('index.html')

@app.route('/contact')
def contact():
    return  render_template('contact.html')


if __name__ == '__main__':
    path1=r"/Users/mukulgoyal/Desktop/Html file/modelf.pkl"
    path2=r"/Users/mukulgoyal/Desktop/Html file/dataframe.pkl"
    with open(path1, 'rb') as f:
        model = pickle.load(f)
    with open(path2, 'rb') as f:
        v = pickle.load(f)
    app.run(debug=True)
    