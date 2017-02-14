module.exports = function Route (app, server) {
	// this gets the socket.io module (below)
	var io = require("socket.io").listen(server)

	var counter = 0; //saves the count

	io.sockets.on("connection", function(socket){
		socket.on("push_button", function(data){
			counter +=1;
			io.emit("push_counter", {response: counter}); 
			/* io.emit is a full broadcast, thus sends data to all connectd clients
			will send counter number to index.ejs after increasing by 1 */
		})

		socket.on("reset_counter", function(data){
			counter = 0;
			io.emit("reset_response", {response: counter});
			/* Will set counter to 0 and send to index.ejs */

		})
	})




	// root route to render the index.ejs view (below)
	app.get("/", function(request, response){
		response.render("index");
	})
};