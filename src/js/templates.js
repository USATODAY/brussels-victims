define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app-view.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-project-info-wrap">\n    <h1 class="iapp-page-header">' +
((__t = ( header )) == null ? '' : __t) +
'</h1>\n    <p class="iapp-page-chatter">' +
((__t = ( chatter )) == null ? '' : __t) +
' </p>\n    <p class="iapp-page-chatter iapp-dark-blue">Last updated on: ' +
((__t = (updated_at )) == null ? '' : __t) +
'</p>\n    <div class="iapp-share-wrap"></div>\n     \n</div>\n<div class="no-results-wrap">\n    <div class=\'no-results-message alert alert-danger\'><strong>No results!</strong> Try searching for another guest.</div>\n</div>\n<div class="iapp-menu"></div>\n<div id="card-wrap" class="iapp-card-wrap"></div>\n<div class="iapp-credits-wrap">\n    <p class="iapp-page-credits"><strong>Credits: </strong>' +
((__t = ( credits )) == null ? '' : __t) +
'</p>\n</div>\n\n\n\n<div class="iapp-end-modal-wrap"></div>\n\n';

}
return __p
};

this["templates"]["card-back.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n      <div class="card card-detail">\n      \n        <div class="iapp-detail-image-wrap">\n        ';
 if (person.photo !== "") { ;
__p += '\n            <img class="iapp-detail-image" src="http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/img/victims/' +
((__t = (person.photo)) == null ? '' : __t) +
'" alt="' +
((__t = (person.name)) == null ? '' : __t) +
'">\n        ';
 } ;
__p += '\n        </div>\n      \n        <div class="close-card">\n            <img class="iapp-close-card-inner" src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/close-icon.svg">\n            \n            </img>\n        </div>\n      \n      \n      \n        <div class="iapp-detail-info">\n            ';
 if (person.photo !== "") { ;
__p += '\n              <p class="iapp-card-back-photo-credit">Photo: ' +
((__t = ( person.photo_source )) == null ? '' : __t) +
'</p>\n            ';
 } ;
__p += '\n            ';
 if (person.place) {;
__p += '\n              <span class="label label-default">' +
((__t = ( person.place )) == null ? '' : __t) +
'</span>\n            ';
 };
__p += '\n            <h2 class="card-back-header">\n              ' +
((__t = ( person.name )) == null ? '' : __t);
 if (person.age) {;
__p += ', ' +
((__t = ( person.age )) == null ? '' : __t);
 };
__p += '\n            </h2>\n            \n            \n            ';
 if (person.nationality) {;
__p += '\n              <p class="iapp-card-info-text"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/img/flags/';
 print(person.nationality.replace(" ", "")) ;
__p += '.png" alt="nationality flag" class="iapp-detail-flag-icon">' +
((__t = ( person.nationality )) == null ? '' : __t) +
'</p>\n            ';
 };
__p += '\n            <p class="iapp-summary">' +
((__t = (person.bio)) == null ? '' : __t) +
'</p>\n        </div>\n      \n      \n      </div>\n      ';
 if (showNext) { ;
__p += '\n      <div class="iapp-next-detail iapp-detail-nav">\n        <img class="" src="http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/img/right-arrow.png">\n        Next\n      </div>\n      ';
 } ;
__p += '\n      ';
 if (showPrevious) { ;
__p += '\n      <div class="iapp-previous-detail iapp-detail-nav">\n        <img class="" src="http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/img/left-arrow.png">\n        Previous</div>\n      ';
 } ;
__p += '\n      \n        <div class="iapp-detail-bg"></div> \n\n';

}
return __p
};

this["templates"]["card-front.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n';
 if (photo !== "") { ;
__p += '\n<div class="cover-img-wrap">\n    <img class="cover-img" src="http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/img/victims/' +
((__t = (photo)) == null ? '' : __t) +
'" alt="' +
((__t = (name)) == null ? '' : __t) +
'">\n</div>\n';
 } ;
__p += '\n\n<div class="iapp-card-info">\n    <h2 class="iapp-card-info-header">\n        ' +
((__t = ( name )) == null ? '' : __t);
 if (age) {;
__p += ', ' +
((__t = ( age )) == null ? '' : __t) +
'</p>';
 };
__p += '\n    </h2>\n    <!--\n    ';
 if (photo !== "") { ;
__p += '\n        <p class="iapp-card-info-photo-credit">Photo: ' +
((__t = ( photo_source )) == null ? '' : __t) +
'</p>\n    ';
 } ;
__p += '\n    -->\n    \n</div>';

}
return __p
};

this["templates"]["lastWeekView.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'iapp-last-week-entry\'>\n    <h2 class=\'iapp-last-week-header\'><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/03/sunday-shows/img/';
 print(networkGuests[0].last_week_network.toLowerCase());
__p += '.png" alt="' +
((__t = (networkGuests[0].last_week_network )) == null ? '' : __t) +
'" class="iapp-last-week-network-logo" /></h2>\n    <h2 class="iapp-last-week-header">' +
((__t = (networkGuests[0].showNames[networkGuests[0].last_week_network])) == null ? '' : __t) +
'</h2>\n    ';
 _.each(networkGuests, function(guestObj) { ;
__p += '\n        <div class="card small-card">\n            \n            <div class="iapp-card-info">\n                <h2 class="iapp-card-info-header">' +
((__t = ( guestObj.guest)) == null ? '' : __t) +
'</h2>\n                <p class="iapp-card-info-text">' +
((__t = (guestObj.description)) == null ? '' : __t) +
'</p>\n            </div>\n        </div>\n    ';
 });
__p += '\n</div>\n';

}
return __p
};

this["templates"]["menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-menu-panel">\n    \n    \n    <h3 class="iapp-menu-header iapp-menu-header-filters">Filters</h3>\n    <div class="iapp-filters-wrap"></div> \n</div>\n\n<div class="iapp-menu-control-area">\n    <div class="iapp-menu-button iapp-button iapp-button-blue iapp-clickable"><div class="iapp-button-text">Filters</div></div>\n    <!-- <div class="iapp&#45;top&#45;button iapp&#45;button iapp&#45;button&#45;blue iapp&#45;clickable"><div class="iapp&#45;button&#45;text">Top</div></div> -->\n    <div class="iapp-menu-close iapp-button iapp-clickable"><div class="iapp-button-text">Close Menu</div></div>\n    <div class="iapp-reset-button iapp-button iapp-clickable"><div class="iapp-button-text">Reset</div></div>\n    <div class="iapp-menu-scoreboard">\n\n        <div class="iapp-menu-scoreboard-likes">\n            <span class="iapp-menu-scoreboard-icon"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/like.svg" alt="like"></span>\n            <div class="iapp-menu-scoreboard-scrore-wrap">\n                <span class="iapp-menu-scoreboard-score iapp-menu-scoreboard-score-number">' +
((__t = (numlikes)) == null ? '' : __t) +
'</span><span class="iapp-menu-scoreboard-score iapp-menu-scoreboard-score-total">/10</span>\n            </div>\n        </div>\n        <div class="iapp-menu-scoreboard-dislikes">\n            \n            <span class="iapp-menu-scoreboard-icon"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/dislike.svg" alt="like"></span> \n            <div class="iapp-menu-scoreboard-scrore-wrap">\n                <span class="iapp-menu-scoreboard-score iapp-menu-scoreboard-score-total">/10</span>\n                <span class="iapp-menu-scoreboard-score iapp-menu-scoreboard-score-number">' +
((__t = (numdislikes)) == null ? '' : __t) +
'</span> \n            </div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["templates"]["search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="search-wrap-container">\n    <div class="search-wrap input-group input-group-lg">\n        <input type="text" name="search-box" class="iapp-search-input form-control" id="iapp-search-input" value="" placeholder="search for a guest" />\n        <span class="iapp-search-button input-group-btn iapp-clickable"><button type="button" class="btn btn-default">search</button></span>\n    </div>\n</div>\n';

}
return __p
};

this["templates"]["share-end.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-end-modal-wrap-content">\n    <div class="iapp-end-modal-close"></div>\n    <div class="iapp-end-modal-content">\n        <h3 class="iapp-end-header">' +
((__t = (endHeader)) == null ? '' : __t) +
'</h3>\n        <p class="iapp-end-chatter">' +
((__t = (endBody)) == null ? '' : __t) +
'</p>\n    </div>\n    <div class="iapp-share-buttons">\n        <a href="https://twitter.com/intent/tweet?url=' +
((__t = (twitterShare)) == null ? '' : __t) +
'&text=' +
((__t = (encodedShare)) == null ? '' : __t) +
'" class="iapp-share-button iapp-share-twitter iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/twitter.svg" alt="Twitter share"></a>\n        <a href="https://www.facebook.com/dialog/feed?display=popup&app_id=' +
((__t = (fb_id)) == null ? '' : __t) +
'&link=' +
((__t = (fbShare)) == null ? '' : __t) +
'&picture=' +
((__t = (stillimage)) == null ? '' : __t) +
'&name=&description=' +
((__t = (encodedShare)) == null ? '' : __t) +
'&redirect_uri=' +
((__t = (fb_redirect)) == null ? '' : __t) +
'" class="iapp-share-button iapp-share-facebook iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/fb.svg" alt="Facebook share"></a>\n        <a href="' +
((__t = (email_link)) == null ? '' : __t) +
'" class="iapp-share-button iapp-share-email"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/email.svg" alt="Email share"></a>\n    </div>\n</div>\n\n<div class="iapp-end-modal-bg"></div>';

}
return __p
};

this["templates"]["share.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-share-buttons">\n    <a href="https://twitter.com/intent/tweet?url=' +
((__t = (twitterShare)) == null ? '' : __t) +
'&text=' +
((__t = (encodedShare)) == null ? '' : __t) +
'" id="Twitter Share" class="iapp-share-button iapp-share-twitter iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/twitter.svg" alt="Twitter share"></a>\n    <a href="https://www.facebook.com/dialog/feed?display=popup&app_id=' +
((__t = (fb_id)) == null ? '' : __t) +
'&link=' +
((__t = (fbShare)) == null ? '' : __t) +
'&picture=' +
((__t = (stillimage)) == null ? '' : __t) +
'&name=&description=' +
((__t = (encodedShare)) == null ? '' : __t) +
'&redirect_uri=' +
((__t = (fb_redirect)) == null ? '' : __t) +
'" id="Facebook Share" class="iapp-share-button iapp-share-facebook iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/fb.svg" alt="Facebook share"></a>\n    <a href="' +
((__t = (email_link)) == null ? '' : __t) +
'" class="iapp-share-button iapp-share-email"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/email.svg" id="Email Share" alt="Email share"></a>\n</div>\n';

}
return __p
};

this["templates"]["tags.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3 class="filter-title">Occupation</h3>\n<div class="occupation-filters"></div>\n<h3 class="filter-title">Race</h3>\n<div class="race-filters"></div>\n<h3 class="filter-title">Gender</h3>\n<div class="gender-filters"></div>\n<h3 class="filter-title">Network</h3>\n<div class="network-filters"></div>\n<h3 class="filter-title">Party</h3>\n<div class="party-filters"></div>\n';

}
return __p
};

  return this["templates"];

});