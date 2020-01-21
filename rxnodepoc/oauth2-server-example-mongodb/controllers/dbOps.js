const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@narendar.net/allapps";
const DB_NAME = "allapps"
const COLLECTION_USERS = "users"
const COLLECTION_ROOMS = "rooms"

// this function will connect db and based on API send response
let connectDbAndRunQueries = async (apiName, req, res) => {
	try {
		let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB, { useNewUrlParser: true })
		// select the db, Collections are selected based on needs
		const db = client.db(DB_NAME)

		// default output
		const output = { "message": "SUCCESS" }

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, db, req, res, client, output)
	} catch (err) {
		console.log('Some Error occurred ...', err)
	}
}
let chooseApiAndSendResponse = (apiName, db, req, res, client, output) => {

	// perform db specific ops based on API names
	switch (apiName) {
		case 'login':
			makeLogin(db, req, res, client, output)
			break;
		case 'getRooms':
			makeGetRooms(db, req, res, client, output)
			break;
		case 'getConversation':
			makeGetConversation(db, req, res, client, output)
			break;
		case 'updateRoom':
			makeUpdateRoom(db, req, res, client, output)
			break;
		case 'updateRoomReadStatus':
			makeUpdateRoomReadStatus(db, req, res, client, output)
			break;
	}
}

let makeLogin = async (db, req, res, client, output) => {
	try {
		let { username, password } = req.body

		let docs = await db
			.collection(COLLECTION_USERS)
			.find({ username, password }, { projection: { "password": 0 } })
			.toArray()

		// rename necessary fields
		docs.map((doc) => {
			doc.userId = doc._id
			doc.name = doc.fullName.substring(0, doc.fullName.indexOf(' '))
			delete doc._id
			delete doc.fullName
		})

		// if the user exists or sends FAILED message
		output = (docs.length > 0) ? { ...docs[0] } : { "message": "FAILED" }
		sendOutputAndCloseConnection(client, output, res)
	} catch (err) {
		sendOutputAndCloseConnection(client)
	}
}
function sendOutputAndCloseConnection(client, output, res) {
	if (output && res) {
		console.log(`========================\nOUTPUT AS RECEIVED AND BEFORE SENDING\n==================\n`, output)
		res.json(output)
	}

	// close the database connection after sending the response
	client.close()
}