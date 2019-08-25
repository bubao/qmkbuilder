const PORT = 5004;
const TMP = '/var/tmp/nrf52-keyboard';

const Express = require('express');
const BodyParser = require('body-parser');
const Crypto = require('crypto');
const Exec = require('child_process').exec;
const Fs = require('fs');

const co = require('co');

// Create the express app.
const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Allow cross-origin requests.
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method == "OPTIONS") {
//     res.send(200);
//   }
//   else {
    next();
//   }
});

// Set up the /build route.
app.post('/build', async(req, res) => {
	// Get the files.
	const files = req.body;

	console.log('files',files)
	// Create a random key.
	const key = Crypto.randomBytes(16).toString('hex');

	// Setup helper functions.
	const clean = () => {
		Exec('rm -rf ' + TMP + key);
	};

	const sendError = err => {
		res.json({ error: err });
		clean();
	};

	// Start.
	try{
		// Copy the base stencil.
		await new Promise((resolve, reject) => {
			Exec('cp -rp /usr/local/src/nrf52-keyboard ' + TMP + key, (err, stdout, stderr) => {
				if (err) {
					console.error(err);
					return reject('Failed to initialize.');
				}
				resolve();
			});
		});

		// Copy all the files.
		for (const file in files) {
			await new Promise((resolve, reject) => {
				const fileName = file.replace('tmk_firmware', TMP + key);
				Fs.writeFile(fileName, files[file], err => {
					if (err) return reject('Failed to initialize.');
					resolve();
				});
			});
		}

		// Make.
		await new Promise((resolve, reject) => {
			Exec('cd ' + TMP + key + '/keyboard/template && make', (err, stdout, stderr) => {
				if (err) {
					console.error(err);
					return reject(stderr);}
				resolve();
			});
		});

		// Read the hex file.
		const hex = await new Promise((resolve, reject) => {
			Fs.readFile(TMP + key + '/keyboard/template/_build/nrf52832_xxaa.hex', 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return reject('Failed to read hex file.');}
				resolve(data);
			});
		});

		// Send the hex file.
		res.json({ hex: hex });

		// Clean up.
		clean();
	} catch (e){
		sendError(e)
	}
});


// Start listening.
app.listen(PORT, () => console.log('Listening on port ' + PORT + '...'));
