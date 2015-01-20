var domify = require("domify");

function SocialController(){}

SocialController.facebook = function(link,text, image){
  FB.ui({
    method: 'feed',
    show_error: true,
    name: 'Fusion Retrosounds',
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