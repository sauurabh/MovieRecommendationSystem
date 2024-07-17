from flask import Flask, jsonify
import pickle
import pandas as pd
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins="*")

@app.route('/moviesList', methods=['GET'])
def getAllMovies():
    movies = pickle.load(open('movie_dict.pkl','rb'))
    moviesDf = pd.DataFrame.from_dict(movies)
    title= moviesDf['title'].values.tolist()
    return jsonify(title), 200


@app.route('/recommend/<string:movieName>', methods=['GET'])
def recommend(movieName):
    recommendedMovie=recommend_movie(movieName)
    return jsonify(recommendedMovie),200


def recommend_movie(movieName):
    movies = pickle.load(open('movie_dict.pkl', 'rb'))
    moviesDf = pd.DataFrame.from_dict(movies)
    index=moviesDf[moviesDf['title'] == movieName].index[0]
    similarity=pickle.load(open('similarity.pkl', 'rb'))
    distances=similarity[index]
    movieList=sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]
    recommendedMovie = []

    for i in movieList:
        filteredMovie=requests.get(f"https://api.themoviedb.org/3/movie/{moviesDf.iloc[i[0]].movie_id}?api_key={}&language=en-US").json()
        filteredMovieOut={
            "title": filteredMovie.get('title'),
            "poster_path": filteredMovie.get('poster_path')
        }
        recommendedMovie.append(filteredMovieOut)
    return recommendedMovie

if __name__ == '__main__':
    app.run(debug=True)


