import mysql.connector
import flask
from flask_cors import CORS, cross_origin

db = mysql.connector.connect(
    host = "mysql.bessapontes.com.br",
    user = "bessapontes10",
    password = "mathias123",
    database = "bessapontes10"    
)

app = flask.Flask(__name__)
cors = CORS(app)

def createUser(user):
    sql = f"insert into usuario (nome, username, email, senha) values ('{user['name']}','{user['username']}','{user['email']}','{user['password']}')"
    c = db.cursor()
    c.execute(sql)
    db.commit()

def getUserEmail(email):
    c = db.cursor()
    c.execute(f"select * from usuario where email = '{email}'")
    return c.fetchone()

def getUsers():
    c = db.cursor()
    c.execute("select * from usuario")
    return c.fetchall()

def getGame(id):
    c = db.cursor()
    c.execute(f"select * from games where id = {id}")
    return c.fetchone()

def getGames():
    c = db.cursor()
    c.execute(f"select * from games")
    return c.fetchall()

def getUsuarioGame(id):
    c = db.cursor()
    c.execute(f"select u.nome,g.nome from game g join usuario u on id u.id = {id} join usuario_game ug on ug.id_game = g.id")
    return c.fetchall()

@cross_origin()
@app.get("/usuario")
def get_user_controller():
    return flask.jsonify(getUsers())

@cross_origin()
@app.post("/usuario")
def post_user_controller():
    if (getUserEmail(flask.request.json["email"]) != None):
        return "Email já cadastrado!"
    createUser(flask.request.json)
    return ""

@cross_origin()
@app.get("/images/<id>")
def get_game_controller(id):
    b = getGame(id)
    return flask.jsonify({"name":b[1],"img":b[2]})

@cross_origin()
@app.get("/game")
def get_games_controller():
    return flask.jsonify(getGames())

@cross_origin()
@app.get("/game/<id>")
def get_usuario_game(id):
    return flask.jsonify(getUsuarioGame(id))


app.run()