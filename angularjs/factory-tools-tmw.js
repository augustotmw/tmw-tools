angular.module("MyApp", []).factory("tmwTools", ["$window", function ($window) {

    var $tools = {
        animation: {
            speed: 500
        },
        localStorage: {
            delete: function (key) {
                $window.localStorage.removeItem(key);
            },
            deleteOldies: function (prefixes, actual) {
                for (key in $window.localStorage) {
                    for (var i = 0; i < prefixes.length; i++) {
                        if (key.indexOf(prefixes[i]) != -1 && key != actual) {
                            $window.localStorage.removeItem(key);
                        }
                    }
                }
            },
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        },
        regex: {
            alphanum: (/[0-9a-zA-ZÀÁÂÃÄÅǍàáâãäåǎÈÉÊËèéêëĚěÊ̌ê̌Ɛ̌ɛ̌ÌÍÎÏìíîïǏǐÒÓÔÕÖØòóôõöøǑǒÙÚÛÜùúûüǓǔǙǚÝŸÿýY̌y̌ÇçÑñ\s\-]/g),
            name: (/[^a-zA-ZÀÁÂÃÄÅǍàáâãäåǎÈÉÊËèéêëĚěÊ̌ê̌Ɛ̌ɛ̌ÌÍÎÏìíîïǏǐÒÓÔÕÖØòóôõöøǑǒÙÚÛÜùúûüǓǔǙǚÝŸÿýY̌y̌ÇçÑñ\s\-]/g),
            accents: {
                all: (/[ÀÁÂÃÄÅǍàáâãäåǎÈÉÊËèéêëĚěÊ̌ê̌Ɛ̌ɛ̌ÌÍÎÏìíîïǏǐÒÓÔÕÖØòóôõöøǑǒÙÚÛÜùúûüǓǔǙǚÝŸÿýY̌y̌ÇçÑñ]/g),
                a: (/[ÀÁÂÃÄÅǍàáâãäåǎ]/g),
                e: (/[ÈÉÊËèéêëĚěÊ̌ê̌Ɛ̌ɛ̌]/g),
                i: (/[ÌÍÎÏìíîïǏǐ]/g),
                o: (/[ÒÓÔÕÖØòóôõöøǑǒ]/g),
                u: (/[ÙÚÛÜùúûüǓǔǙǚ]/g),
                n: (/[Ññ]/g),
                y: (/[ÝŸÿýY̌y̌]/g),
                c: (/[Çç]/g)
            },
            stopwords: (/\b(de|a|o|que|e|do|da|em|um|para|é|com|não|uma|os|no|se|na|por|mais|as|dos|como|mas|foi|ao|ele|das|tem|à|seu|sua|ou|ser|quando|muito|há|nos|já|está|eu|também|só|pelo|pela|até|isso|ela|entre|era|depois|sem|mesmo|aos|ter|seus|quem|nas|me|esse|eles|estão|você|tinha|foram|essa|num|nem|suas|meu|às|minha|têm|numa|pelos|elas|havia|seja|qual|será|nós|tenho|lhe|deles|essas|esses|pelas|este|fosse|dele|tu|te|vocês|vos|lhes|meus|minhas|teu|tua|teus|tuas|nosso|nossa|nossos|nossas|dela|delas|esta|estes|estas|aquele|aquela|aqueles|aquelas|isto|aquilo|estou|está|estamos|estão|estive|esteve|estivemos|estiveram|estava|estávamos|estavam|estivera|estivéramos|esteja|estejamos|estejam|estivesse|estivéssemos|estivessem|estiver|estivermos|estiverem|hei|há|havemos|hão|houve|houvemos|houveram|houvera|houvéramos|haja|hajamos|hajam|houvesse|houvéssemos|houvessem|houver|houvermos|houverem|houverei|houverá|houveremos|houverão|houveria|houveríamos|houveriam|sou|somos|são|era|éramos|eram|fui|foi|fomos|foram|fora|fôramos|seja|sejamos|sejam|fosse|fôssemos|fossem|for|formos|forem|serei|será|seremos|serão|seria|seríamos|seriam|tenho|tem|temos|tém|tinha|tínhamos|tinham|tive|teve|tivemos|tiveram|tivera|tivéramos|tenha|tenhamos|tenham|tivesse|tivéssemos|tivessem|tiver|tivermos|tiverem|terei|terá|teremos|terão|teria|teríamos|teriam)\b/g)
        },
        remove: {
            accents: function (letters, term) {
                if (letters && typeof letters == "string" && letters != "") {
                    letters = letters.replace(/[\W\d]/gi, "").split("");
                    for (var i = 0; i < letters.length; i++) {
                        // console.log(letters[i]);
                        if ($tools.regex.accents[letters[i]]) {
                            term = term.replace($tools.regex.accents[letters[i]], letters[i]);
                        }
                    }
                    return term;
                } else {
                    return term;
                }
            },
            stopwords: function (term) {
                return term.replace($tools.regex.stopwords, "");
            }
        },
        scrollTo: function (coordY, config) {
            config = angular.extend({}, {
                adjust: 0,
                callback: function () { return true; },
                menu: 0
            }, (config && (config instanceof Object) ? config : {}));

            angular.element("html, body").animate({ "scrollTop": (coordY + config.adjust) - config.menu }, this.animation.speed, function () {
                config.callback(coordY, config, this);
            });
        },
        youtube: {
            add: function (videoConfig) {
                if (typeof $rootScope.youtubeVideos === 'undefined') {
                    $rootScope.youtubeVideos = [];
                }

                if (videoConfig instanceof Array) {
                    for (var i = 0; i < videoConfig.length; i++) {
                        $rootScope.youtubeVideos.push(videoConfig[i]);
                    }
                } else if (videoConfig instanceof Object) {
                    $rootScope.youtubeVideos.push(videoConfig);
                } else {
                    console.warn("ZeppelinDefaults.youtube.add says: Propriedades de vídeo passadas não estão no formato de Objeto ou Array.");
                }

            },
            get: function (id) {
                if (typeof $rootScope.youtubeVideos === 'undefined') {
                    return false;
                } else {
                    var video = false;
                    for(var i=0; i < $rootScope.youtubeVideos.length; i++) {
                        if($rootScope.youtubeVideos[i].id = id) {
                            video = $rootScope.youtubeVideos[i];
                        }
                    }
                    return video;
                }
            },
            load: function () {

                if (angular.element("script[src*='www.youtube.com/iframe_api']").length < 1) {
                    var tag = document.createElement('script');

                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    function createPlayer(playerInfo) {
                        return new YT.Player(playerInfo.id, {
                            videoId: playerInfo.videoId
                        });
                    }

                    window.onYouTubeIframeAPIReady = function () {
                        if (typeof $rootScope.youtubeVideos === 'undefined') return;

                        for (var i = 0; i < $rootScope.youtubeVideos.length; i++) {
                            var curplayer = createPlayer($rootScope.youtubeVideos[i]);
                            $rootScope.youtubeVideos[i].instance = curplayer;
                        }
                    }

                }

                /* how to use: 
                
                add has to come before load:

                    tools.youtube.add({
                        id: "videoPlayer",
                        videoId: 'qm2Lab-8Uto'
                    });

                    tools.youtube.load();

                     tools.youtube.get("videoPlayer");
                
                */

            }
        }

    }

    return $tools;
}]);