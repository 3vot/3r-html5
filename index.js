
function SocialController(){}


SocialController.onSocialBarClick = function(e){
  if( !e.target.classList.contains("social-bar-icon")  ) return false;
  var type = e.target.dataset.type;
  var socialBar = e.target.parentNode.parentNode;
  var id = socialBar.dataset.id;
  var image = "http://interactive.fusion.net/stop-telling-women-to-smile/images/social/" + id + ".jpg"
  //console.log( image )
  var url = "http://fusion.net/stwts%23" + id
  var content = SocialController.content[id];
  SocialController.share( type, content[type] , image, url)

}

SocialController.share = function(network, text, image, link){
  
  if(network == "FB") return SocialController.facebook( link, text, image );
  else if(network == "TW") return SocialController.twitter( link, text, image );
  else throw "SOCIAL NETWORK NAME NOT RECOGNIZED " + network;
}

SocialController.facebook = function(link,text, image){
  FB.ui({
    method: 'feed',
    show_error: true,
    name: 'HEADLINE',
    link: link,
    picture: image,
    description: text,
    href: link,
  }, function(response){});
}

SocialController.twitter = function(link, text, image){
  var shareText = text;
  var url = link;
  var w = 550;
  var h = 300;
  var top = (screen.height / 2) - (h / 2);
  var left = (screen.width / 2) - (w / 2);
  var href = "http://twitter.com/share?text=" + encodeURI(shareText) + "&url=" + url + "&via=thisisfusion";
  window.open(href, "tweet", "height=" + h + ",width=" + w + ",top=" + top + ",left=" + left + ",resizable=1");
}

module.exports = SocialController;