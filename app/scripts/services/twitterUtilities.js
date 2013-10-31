/* jshint camelcase: false */
'use strict';

angular.module('portfolioApp')
  .factory('twitterUtilities', function ($sce) {

    var options = {
      avatar_size: null,
      twitter_url: 'twitter.com',
      username: null,
      list: null
    };

    // See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(date) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
      var r = '';
      if (delta < 1) {
        r = 'just now';
      } else if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'about a minute ago';
      } else if(delta < (45*60)) {
        r = 'about ' + (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'about an hour ago';
      } else if(delta < (24*60*60)) {
        r = 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'about a day ago';
      } else {
        r = 'about ' + (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return r;
    }

    function replacer (regex, replacement, o) {
      return o.replace(regex, replacement);
        // var returning = [];
        // o.each(function() {
        //   returning.push(o.replace(regex, replacement));
        // });
        // return $(returning);
    }

    function extract_avatar_url(item, secure) {
      if (secure) {
        return ('user' in item) ?
          item.user.profile_image_url_https :
          extract_avatar_url(item, false).
          replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//, 'https://s3.amazonaws.com/twitter_production/');
      } else {
        return item.profile_image_url || item.user.profile_image_url;
      }
    }

    function escapeHTML(s) {
      return s.replace(/</g,'&lt;').replace(/>/g,'^&gt;');
    }

    function linkUser(o) {
      return replacer(/(^|[\W])@(\w+)/gi, '$1<span class=\"at\">@</span><a href=\"http://"+options.twitter_url+"/$2\">$2</a>', o);
    }

    function linkHash(o) {
      return replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
        ' <a href="https://twitter.com/search?q=%23$1'+((options.username && options.username.length === 1 && !options.list) ? '&from='+options.username.join('%2BOR%2B') : '')+'" class="tweet_hashtag">#$1</a>',
        o
        );
    }

    function linkURLs(text, entities) {
      return text.replace(url_regexp, function(match) {
        var url = (/^[a-z]+:/i).test(match) ? match : 'http://'+match;
        var text = match;
        for(var i = 0; i < entities.length; ++i) {
          var entity = entities[i];
          if (entity.url === url && entity.expanded_url) {
            url = entity.expanded_url;
            text = entity.display_url;
            break;
          }
        }
        return '<a href=\"'+escapeHTML(url)+'\">'+escapeHTML(text)+'</a>';
      });
    }


    return {
      clean: function (item) {
        var o = {};
        o.item = item;
        o.source = item.source;
        // The actual user name is not returned by all Twitter APIs, so please do not file an issue if it is empty.
        o.name = item.from_user_name || item.user.name;
        o.screen_name = item.from_user || item.user.screen_name;
        o.avatar_size = options.avatar_size;
        o.avatar_url = extract_avatar_url(item, (document.location.protocol === 'https:'));
        o.retweet = typeof(item.retweeted_status) !== 'undefined';
        o.tweet_time = parse_date(item.created_at);
        // o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
        o.tweet_id = item.id_str;
        o.twitter_base = 'http://' + options.twitter_url + '/';
        o.user_url = o.twitter_base + o.screen_name;
        o.tweet_url = o.user_url + '/status/' + o.tweet_id;
        o.reply_url = o.twitter_base + 'intent/tweet?in_reply_to='+ o.tweet_id;
        o.retweet_url = o.twitter_base + 'intent/retweet?tweet_id=' + o.tweet_id;
        o.favorite_url = o.twitter_base + 'intent/favorite?tweet_id=' + o.tweet_id;
        o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
        o.retweeted_user_url = o.retweet && o.twitter_base + o.retweeted_screen_name;
        o.tweet_relative_time = relative_time(o.tweet_time);
        o.entities = item.entities ? (item.entities.urls || []).concat(item.entities.media || []) : [];
        o.tweet_raw_text = o.retweet ? ('RT @' + o.retweeted_screen_name + ' ' + item.retweeted_status.text) : item.text; // avoid '...' in long retweets
        // var toto = linkURLs(o.tweet_raw_text, o.entities);
        // var titi = linkUser(toto);
        // var tata = linkHash(titi);
        // console.log('linkURLs = ' + toto);
        // console.log('linkUser = ' + titi);
        // console.log('linkHash = ' + tata);

        o.tweet_text = $sce.trustAsHtml(linkHash(linkUser(linkURLs(o.tweet_raw_text, o.entities))));
        // o.tweet_text_fancy = $([o.tweet_text]).makeHeart()[0];
        return o;
      }
    };
  });
