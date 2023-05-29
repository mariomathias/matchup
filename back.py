import mysql.connector
import flask
import jwt
import base64
from flask_cors import CORS, cross_origin

def connect_db():
    return mysql.connector.connect(
        host = "mysql.bessapontes.com.br",
        user = "bessapontes10",
        password = "mathias123",
        database = "bessapontes10"    
    )

jwtpassword = "caldodekanna"
app = flask.Flask(__name__)
cors = CORS(app)

def generate_token(userid):
    p = {"userid": userid}
    token = jwt.encode(p, jwtpassword)
    return token

def create_user(user):
    db = connect_db()
    sql = f"insert into usuario (nome, username, email, senha, foto) values ('{user['name']}','{user['username']}','{user['email']}','{user['password']}', 'iconpadrao.png')"
    c = db.cursor()
    c.execute(sql)
    db.commit()
    c.close()
    db.close()

def update_user(user):
    db = connect_db()
    sql = f"update usuario set nome='{user['name']}', sobre='{user['about']}' username='{user['username']}', email='{user['email']}', senha='{user['password']}', celular='{user['celular']}', endereco='{user['endereco']}', discord='{user['discord']}', twitter='{user['twitter']}', instagram  where id_usuario={user['id']}"
    c = db.cursor()
    c.execute(sql)
    db.commit()
    c.close()
    db.close()

def update_user_img(user, path):
    db = connect_db()
    sql = f"update usuario set foto='{path}' where id_usuario={user}"
    c = db.cursor()
    c.execute(sql)
    db.commit()
    c.close()
    db.close()


def get_user_by_email(email):
    db = connect_db()
    c = db.cursor()
    c.execute(f"select * from usuario where email = '{email}'")
    res = c.fetchone()
    c.close()
    db.close()
    return res

def check_user(email, password):
    db = connect_db()
    c = db.cursor()
    c.execute(f"select * from usuario where email = '{email}' and senha = '{password}'")
    res = c.fetchone()
    c.close()
    db.close()
    return res

def get_user(id):
    db = connect_db()
    c = db.cursor()
    c.execute(f"select * from usuario where id_usuario = {id}")
    res = c.fetchone()
    c.close()
    db.close()
    return res

def get_all_users():
    db = connect_db()
    c = db.cursor()
    c.execute("select * from usuario")
    res = c.fetchall()
    c.close()
    db.close()
    return res

def get_game(id):
    db = connect_db()
    c = db.cursor()
    c.execute(f"select * from games where id = {id}")
    res = c.fetchone()
    c.close()
    db.close()
    return res

def get_all_games():
    db = connect_db()
    c = db.cursor()
    c.execute(f"select * from games")
    res = c.fetchall()
    c.close()
    db.close()
    return res

def get_games_from_user(id):
    db = connect_db()
    c = db.cursor()
    c.execute(f"select g.nome from usuario_game ug join games g on ug.id_game = g.id where ug.id_usuario = '{id}'")
    res = c.fetchall()
    res = list(map(lambda x: x[0], res))
    c.close()
    db.close()
    return res

@cross_origin()
@app.get("/usuario")
def app_get_user():
    token = flask.request.headers.get("Authorization", "")
    if token == "":
        return "", 498
    try:
        dtoken = jwt.decode(token, jwtpassword, algorithms=["HS256"])
        userid = dtoken.get("userid")
        user = get_user(userid)
        return flask.jsonify(user)
    except:
        return "", 498

@cross_origin()
@app.post("/usuario")
def app_post_user():
    if (get_user_by_email(flask.request.json["email"]) != None):
        return "Email já cadastrado!"
    create_user(flask.request.json)
    return ""

@cross_origin()
@app.post("/login")
def app_post_login():
    data = flask.request.json
    user = check_user(data["email"], data["password"])
    if user is not None:
        id = user[0]
        return generate_token(id), 201
    return "", 401

@cross_origin()
@app.put("/usuario")
def app_put_user(user):
    token = flask.request.headers.get("Authorization", "")
    if token == "":
        return "", 498
    try:
        jwt.decode(token, jwtpassword, algorithms=["HS256"])
        update_user(flask.request.json)
        return '', 204
    except:
        return "", 498

@cross_origin()
@app.post("/image")
def upload_image():
    token = flask.request.headers.get("Authorization", "")
    if token == "":
        return "", 498
    try:
        dtoken = jwt.decode(token, jwtpassword, algorithms=["HS256"])
        userid = dtoken.get("userid")
        img64 = flask.request.json['img64']
        with open(f'imgs/{userid}.png', 'wb+') as f:
            f.write(base64.b64decode(img64))
        update_user_img(userid, f'{userid}')
        return '', 204
    except jwt.DecodeError:
        return "", 498

@cross_origin()
@app.get("/user/image/<id>")
def app_get_game(id):
    return flask.send_file(f'imgs/{id}.png')

@cross_origin()
@app.get("/images/<id>")
def app_get_user_img(id):
    b = get_game(id)
    return flask.jsonify({"name":b[1],"img":b[2]})

@cross_origin()
@app.get("/game")
def app_get_games():
    return flask.jsonify(get_all_games())

@cross_origin()
@app.get("/game/<id>")
def app_get_games_from_user(id):
    return flask.jsonify(get_games_from_user(id))



app.run(debug=True)