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

def getUsers():
    c = db.cursor()
    c.execute("select * from usuario")
    return c.fetchall()

def getGame(id):
    c = db.cursor()
    c.execute(f"select * from games where id = {id}")
    return c.fetchone()

@cross_origin()
@app.get("/usuario")
def getUsuario():
    return flask.jsonify(getUsers())

@cross_origin()
@app.post("/usuario")
def postUsuario():
    createUser(flask.request.json)
    return ""

@cross_origin()
@app.get("/images/<id>")
def getImage(id):
    b = getGame(id)
    return flask.jsonify({"name":b[1],"img":b[2]})

app.run()