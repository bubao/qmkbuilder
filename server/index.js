const PORT = 5004;
const TMP = '/tmp/tmk-';

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
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Set up the /build route.
app.post('/build', async(req, res) => {
	// Get the files.
	const files = req.body;

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
			Exec('cp -rp tmk_firmware ' + TMP + key, (err, stdout, stderr) => {
				if (err) return reject('Failed to initialize.');
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
			Exec('cd ' + TMP + key + '/keyboards/kb && make', (err, stdout, stderr) => {
				if (err) return reject(stderr);
				resolve();
			});
		});

		// Read the hex file.
		const hex = await new Promise((resolve, reject) => {
			Fs.readFile(TMP + key + '/kb_default.hex', 'utf8', (err, data) => {
				if (err) return reject('Failed to read hex file.');
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
}).catch(e => sendError(e));


// Start listening.
app.listen(PORT, () => console.log('Listening on port ' + PORT + '...'));
