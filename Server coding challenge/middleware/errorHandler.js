const {Movies} = require('./models/movie-model');
const {Actors} = require('./models/actor-model');

function errorHandler(req, res) {
    /* 

        Your code goes here

    */
    let idBody = req.body.id;
    let idParam = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(!idBody){
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end();
    }

    if(idBody !== idParam){
        res.statusMessage = "id and movie_ID do not match";
        return res.status(409).end();
    }

    if(!firstName || !lastName){
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        return res.status(403).end();
    }

    Movies
        .getMovieById(idParam)
        .then(movie => {
            if(movie){
                let actorToRemove = -1;
                movie.actors.forEach(actor =>{
                    if(firstName === actor.firstName && lastName === actor.lastName){
                        actorToRemove = movie.actors.indexOf(actor);
                    }
                });
                if(actorToRemove === -1){
                    throw new Error("The actor or movie do not exist");
                }
                else{
                    movie.actors.splice(actorToRemove, 1);
                    Movies
                        .removeActorFromMovieList(movie.movie_ID, movie.actors)
                        .then(result => {
                            return res.status(200).json(movie);
                        })
                        .catch(err => {
                            res.statusMessage = "Something went wrong with update";
                            return res.status(500).end();
                        });
                }
            }
            else{
                throw new Error("The actor or movie do not exist");
            }
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(404).end();
        });
}

module.exports = errorHandler;