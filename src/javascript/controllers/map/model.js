var data =require("./locations.json")

function Model(location){
	this.location = location;
}

Model.prototype.getImages = function(){
	if( !this.location.images || this.location.images.length < 2 ) return [];
	return this.location.images.split(',')
}

Model.list = []
Model.load = function(){
	var locationsMap = {};
	for (var i = 0; i < data.locations.length; i++) {
		var location = data.locations[i];
		var locationItem = locationsMap[location.Folder]
		if(!locationItem){ locationItem = {
			name:     location.Address,
			date:     location.Date,
			caption:  location.Caption,
			folder:   location.Folder,
			images:   [ location.Folder + "/" + location.MediaName ]
			} 
		}
		else locationItem.images.push( locationItem.folder + "/" + location.MediaName )
		
		locationsMap[location.Folder] = locationItem;
	};

	for(location in locationsMap){
		Model.list.push( new Model( locationsMap[location] ) );
	}

}


module.exports = Model;