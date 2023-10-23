const { InitialiseSqlClients, authDbCli } = require("../dal/dbClient");

schemas = {
	Users: [
		'idx int NOT NULL AUTO_INCREMENT',
	    "name varchar(255) NOT NULL",
	    "email varchar(255) NOT NULL",
	    "pwd varchar(255) NOT NULL",
	    "PRIMARY KEY (idx)"
	    ],
	Objects: [
		'idx int NOT NULL AUTO_INCREMENT',
		"name varchar(255) NOT NULL",
		"PRIMARY KEY (idx)"
		],
	AccessRights: [
		'idx int NOT NULL AUTO_INCREMENT',
		"name varchar(255) NOT NULL",
		"PRIMARY KEY (idx)"
	],
	ACM: [
		"accessRight int",
		"uid int",
		"oid int",
		"PRIMARY KEY(accessRight, uid, oid)",
		"FOREIGN KEY (uid) REFERENCES Users(idx)",
		"FOREIGN KEY (oid) REFERENCES Objects(idx)",
		"FOREIGN KEY (accessRight) REFERENCES AccessRights(idx)",
	]
};


commands = [
	'INSERT INTO AccessRights(name) VALUES("read")',
	'INSERT INTO AccessRights(name) VALUES("write")',
	'INSERT INTO AccessRights(name) VALUES("own")'
];

InitialiseSqlClients().then(() => {
	Object.keys(schemas).forEach(schema => {
		const query = "CREATE TABLE " + schema + "(" + schemas[schema].join(', ') + ");";
		authDbCli.query(query);
	});

	commands.forEach(cmd => {
		authDbCli.query(cmd);
	})
});