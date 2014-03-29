(function(){

    // The CocoonJS and CocoonJS.Social must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating the extension types.");
    if (typeof window.CocoonJS.Social === 'undefined' || window.CocoonJS.Social === null) throw("The CocoonJS.Social object must exist and be valid before creating the extension types.");

    /**
     * @class
     * @constructor
     * Represents a type that mimics the original GameCenter API (somehow ;)) with the addition of the possibility to 
     * retrieve an abstract high level interface API to handle a SocialGamingService (APIs defined by Ludei) and multiplayer support.
     */
    CocoonJS.Social.GameCenterExtension = function() {
        this.nativeExtensionName = "IDTK_SRV_GAMECENTER";
        this.extensionName = "Social.GameCenter";
        this.nativeExtensionObjectAvailable =  CocoonJS.nativeExtensionObjectAvailable && typeof window.ext[this.nativeExtensionName] !== 'undefined';

        var me = this;
        if (this.nativeExtensionObjectAvailable) {
            this.onGameCenterLoginStateChanged = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onGameCenterLoginStateChanged");

            this.onGameCenterLoginStateChanged.addEventListener(function(localPlayer,error){
                me._currentPlayer = localPlayer;
            });
        }
        return this;
    };

    CocoonJS.Social.GameCenterExtension.prototype = {

        _currentPlayer: null,

        /**
         * Return a CocoonJS SocialGaming interface for the Game Center Extension
         * You can use the Game Center extension in two ways, with 1:1 official API equivalent or with the CocoonJS Social API abstraction
         * @see CocoonJS.Social.SocialGamingService
         * @returns {CocoonJS.Social.SocialGamingService}
         */
        getSocialInterface: function() {
            if (!this._socialService) {
                this._socialService = new CocoonJS.Social.SocialGamingServiceGameCenter(this);
            }
            return this._socialService;
        },

        /**
         * Return a CocoonJS Multiplayer interface for the Game Center Extension
         * @returns {CocoonJS.Multiplayer.MultiplayerService}
         */
        getMultiplayerInterface: function() {
            return CocoonJS.Multiplayer.GameCenter;
        },

        isLoggedIn: function() {
            return this._currentPlayer && this._currentPlayer.isAuthenticated;
        },

        /**
         * Authenticate the user
         * @params {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.LocalPlayer and error.
         */
        login: function(callback) {
            var me = this;
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "login", [function(response, error) {
                    me._currentPlayer = response;
                    if (callback) {
                        callback(response,error);
                    }
                }], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Synchronous accessor for the current authResponse
         * @returns {CocoonJS.Social.GameCenter.LocalPlayer} current Local Player data
         */
        getLocalPlayer: function() {
            if (this._currentPlayer)
                return this._currentPlayer;
            if (this.nativeExtensionObjectAvailable) {
                this._currentPlayer = CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "getLocalPlayer", []);
                return this._currentPlayer;
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Load the players for the provided identifiers.
         * @param {array} playerIDs Array of player identifiers
         * @param {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.Player array and error
         */
        loadPlayers: function(playerIDs, callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "loadPlayers", [playerIDs, callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Load the friends for the current logged in user.
         * @param {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.Player array and error
         */
        loadFriends: function(callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "loadFriends", [callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Load the earned achievements for the current logged in user.
         * @param {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.Achievements array and error
         */
        loadAchievements: function(callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "loadAchievements", [callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Load the application achievement descriptions
         * @param {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.AchievementDescription array and error
         */
        loadAchievementDescriptions: function(callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "loadAchievementDescriptions", [callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Load the application achievement descriptions
         * @param {function} callback The callback function. Response params: CocoonJS.Social.GameCenter.Leaderboard object and error
         * @param {CocoonJS.Social.GameCenter.Leaderboard} [query] Optional query parameters
         */
        loadScores: function(callback, query) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "loadScores", [query,callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Report user score to the server
         * @param {CocoonJS.Social.GameCenter.Score} score definition of the score and it's category (leaderboardID).
         * If no category is specified the default one is used.
         * @param {function} callback The callback function. Response params: error
         */
        submitScore: function(score, callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "submitScore", [score,callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Report user earned achievements to the server
         * @param {array} achievements Array of CocoonJS.Social.GameCenter.Achievement objects
         * @param {function} callback The callback function. Response params: error
         */
        submitAchievements: function(achievements, callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "submitAchievements", [achievements,callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Resets all the achievements of the current logged in user
         * @param {function} [callback] The callback function. Response params: error.
         */
        resetAchievements : function(callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "resetAchievements", [callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Shows a native view with the standard user interface for achievements
         * @param {function} callback The callback function when the view is closed by the user. Response params: error
         */
        showAchievements: function(callback) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "showAchievements", [callback], true);
            }
            else {
                throw "Game Center not available";
            }
        },
        /**
         * Shows a native view with the standard user interface for leaderboards
         * @param {function} callback The callback function when the view is closed by the user. Response params: error
         * @param {CocoonJS.Social.GameCenter.Leaderboard} [query] Optional parameters
         */
        showLeaderboards: function(callback, query) {
            if (this.nativeExtensionObjectAvailable) {
                CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "showLeaderboards", [query, callback], true);
            }
            else {
                throw "Game Center not available";
            }
        }
    };

    /**
     * @namespace
     * This is the global variable that enables access to the GameCenter API mimic and the high level abstract API
     * to handle Social and Multiplayer aspects created by Ludei.
     * @see CocoonJS.Social.GameCenterExtension
     */
    CocoonJS.Social.GameCenter = new CocoonJS.Social.GameCenterExtension();

    /**
     * @class
     * The data structure that represents the information of a Game Center player (Readonly)
     */
    CocoonJS.Social.GameCenter.Player = function() {
        /**
         * The identifier of the player.
         * @type string
         */
        this.playerID = "";
        /**
         * The alias of the player.
         * @type string
         */
        this.alias = "";
        /**
         * True if the user is friend of the local player
         * @type boolean
         */
        this.isFriend = false;
    }

    /**
     * @class
     * The data structure that represents the information of the Game Center Local Player (Readonly)
     */
    CocoonJS.Social.GameCenter.LocalPlayer = function() {
        /**
         * The identifier of the player.
         * @type string
         */
        this.playerID = "";
        /**
         * The alias of the player.
         * @type string
         */
        this.alias = "";
        /**
         * Indicates the authentication state of the current player
         * @type boolean
         */
        this.isAuthenticated = false;
    }

    /**
     * The data structure that represents an earned achievement by the user
     * @class
     * @constructor
     * @param {string} identifier The id of the achievement.
     * @param {number} [percentComplete] The percentage on which the achievement has been completed. 100% by default.
     */
    CocoonJS.Social.GameCenter.Achievement = function(identifier, percentComplete) {
        /**
         * The identifier of the achievement.
         * @type string
         */
        this.identifier = identifier;
        /**
         * Percentage of achievement complete (from 0 to 100)
         * @type number
         */
        this.percentComplete = percentComplete;
        /**
         *  Date the achievement was last reported (unix time)
         * @type number
         */
        this.lastReportedDate = 0;
    }

    /**
     * @class
     * The data structure that represents achievements defined by the application (Readonly)
     */
    CocoonJS.Social.GameCenter.AchievementDescription = function() {
        /**
         * The identifier of the achievement.
         * @type string
         */
        this.identifier = "";
        /**
         * The title of the achievement
         * @type string
         */
        this.title = "";
        /**
         * The description for an achieved achievement
         * @type string
         */
        this.achievedDescription = "";
        /**
         * The description for an unachieved achievement.
         * @type string
         */
        this.achievedDescription = "";

        /**
         * The maximum points of the achievement
         * @type number
         */
        this.maximumPoints = 0;
    }

    /**
     * @class
     * @constructor
     * The data structure that a score in the leaderboards
     * @param {number} value The value of the score.
     * @param {string} category The category where the score is associated.
     */
    CocoonJS.Social.GameCenter.Score = function(value,category) {
        /**
         * The score value as a 64bit integer.
         * @type number
         */
        this.value = value;
        /**
         * Leaderboard category
         * @type string
         */
        this.category = category;
        /**
         * The identifier of the player that recorded the score
         * @type string
         */
        this.playerID = "";
        /**
         * The rank of the player within the leaderboard
         * @type number
         */
        this.rank = 0;
    }

    /**
     * @class
     * @constructor
     * The data structure that represents the set of high scores for the current game
     * @param {string} category The category of the leaderboard.
     * @param {array} payerIDs
     * @param {CocoonJS.Social.GameCenter.TimeScope} timeScope
     * @param {CocoonJS.Social.GameCenter.PayerScope} payerScope
     * @param {number} rangeStart
     * @param {number} rangeLength
     */
    CocoonJS.Social.GameCenter.Leaderboard = function(category, playerIDs, timeScope, playerScope, rangeStart, rangeLength) {
        /**
         * leaderboard category (query parameter)
         * @type string
         */
        this.category = category;
        /**
         * Player identifiers array (query parameter)
         * @type string
         */
        this.playerIDs = category;
        /**
         * Time scope (query parameter)
         * @type CocoonJS.Social.GameCenter.TimeScope
         */
        this.timeScope = timeScope;
        /**
         * Player scope (query parameter)
         * @type CocoonJS.Social.GameCenter.PlayerScope
         */
        this.playerScope = playerScope;
        /**
         * Leaderboards start at index 1 and the length should be less than 100 (query parameter)
         * @type number
         */
        this.rangeStart = rangeStart;
        /**
         * Leaderboards start at index 1 and the length should be less than 100 (query parameter)
         * @type number
         */
        this.rangeLength = rangeLength;
        /**
         * Scores array (response parameter)
         * @type Array of CocoonJS.Social.GameCenter.Score
         */
        this.scores = [];
        /**
         * Local player score (response parameter)
         * @type CocoonJS.Social.GameCenter.Score
         */
        this.localPlayerScore = [];
        /**
         * Localized category title
         * @type string
         */
        this.localizedTitle = localizedTitle;
    }

    /**
     * @enum
     * This enumeration represents the possible Time Scopes for a leaderboad query.
     */
    CocoonJS.Social.GameCenter.TimeScope =
    {
        TODAY: 0,
        WEEK: 1,
        ALL_TIME:2
    };

    /**
     * @enum
     * This enumeration represents the possible Player Scopes for a leaderboad query.
     */
    CocoonJS.Social.GameCenter.PlayerScope =
    {
        GLOBAL: 0,
        FRIENDS: 1
    };


    //Social API Interface
    CocoonJS.Social.SocialGamingServiceGameCenter = function(gcExtension) {
        CocoonJS.Social.SocialGamingServiceGameCenter.superclass.constructor.call(this);
        this.gc = gcExtension;
        var me = this;
        this.gc.onGameCenterLoginStateChanged.addEventListener(function(localPlayer, error){
            me.onLoginStatusChanged.notifyEventListeners(localPlayer.isAuthenticated,error);
        });
        return this;
    }

    CocoonJS.Social.SocialGamingServiceGameCenter.prototype =  {

        _cachedAchievements: null,

        isLoggedIn: function() {
            return this.gc.isLoggedIn();
        },
        login : function(callback) {
            this.gc.login(function(localPlayer, error){
                if (callback)
                    callback(localPlayer.isAuthenticated, error);
            });
        },
        logout: function(callback) {
            if (callback)
                callback({message:"User has to logout from the Game Center APP"});
        },
        getLoggedInUser : function() {
            return fromGCPLayerToCocoonUser(this.gc._currentPlayer ? this.gc._currentPlayer : this.gc.getLocalPlayer());
        },

        requestUser: function(callback, userId) {
            if (userId) {
                this.gc.loadPlayers([userId], function(response, error) {
                    var user = response && response.length ? fromGCPLayerToCocoonUser(response[0]) : null;
                    callback(user, error);
                });
            }
            else {
                var me = this;
                setTimeout(function(){
                    callback(me.getLoggedInUser());
                })
            }
        },
        requestFriends: function(callback, userId) {
            this.gc.loadFriends(function(friends, error){
                var users = [];
                if (friends && friends.length) {
                    for (var i= 0; i< friends.length; ++i) {
                        users.push(fromGCPLayerToCocoonUser(friends[i]));
                    }
                }
                callback(users, error);
            });
        },
        requestScore: function(callback, params) {
            var query = {};
            var options = params || {};
            if (options.leaderboardID)
                query.category = options.leaderboardID;
            query.playerIDs = [options.userID || this.getLoggedInUser().userID];

            this.gc.loadScores(function(response, error) {
                var gcScore = null;
                if (options.userID && response && response.scores && response.scores.length)
                    gcScore = response.scores[0];
                else if (response && response.localPlayerScore)
                    gcScore = response.localPlayerScore;
                var loadedScore = gcScore ? new CocoonJS.Social.Score(gcScore.playerID, gcScore.value, "","", gcScore.category) : null;
                callback(loadedScore,error);
            }, query);
        },

        submitScore: function(score, callback, params) {
            var options = params || {};
            this.gc.submitScore({value:score, category:options.leaderboardID || ""}, function(error){
                if (callback)
                    callback(error);
            });
        },

        showLeaderboard : function(callback, params) {
            var options = params || {};
            this.gc.showLeaderboards(function(error){
                if (callback)
                    callback(error);
            }, {category:options.leaderboardID || ""});
        },
        //internal utility function
        prepareAchievements: function(reload, callback) {

            if (!this._cachedAchievements || reload) {
                var me = this;
                this.gc.loadAchievementDescriptions(function(response, error){
                    if (error) {
                        callback([],error);
                    }
                    else {
                       var achievements = [];
                       if (response && response.length) {
                           for (var i = 0; i < response.length; i++) {
                               achievements.push(fromGCAchievementDescriptionToCocoonAchievement(response[i]))
                           }
                       }
                       me.setCachedAchievements(achievements);
                       callback(achievements, null);
                    }

                });
            }
            else {
                callback(this._cachedAchievements, null);
            }
        },

        requestAllAchievements : function(callback) {
            this.prepareAchievements(true, callback);
        },

        requestAchievements : function(callback, userID) {
            var me = this;
            this.prepareAchievements(false, function(allAchievements, error){
                if (error) {
                    callback([], error);
                    return;
                }
                me.gc.loadAchievements(function(response, error){
                    if (!error) {
                        var achievements = [];
                        if (response && response.length) {
                            for (var i = 0; i < response.length; i++) {
                                var ach = me.findAchievement(response[i].identifier);
                                if (ach)
                                    achievements.push(ach);
                            }
                        }
                        callback(achievements, null);
                    }
                    else {
                        callback([], response.error);
                    }

                });
            });
        },
        submitAchievement: function(achievementID, callback) {
            if (achievementID === null || typeof achievementID === 'undefined')
                throw "No achievementID specified";
            var achID = this.translateAchievementID(achievementID);
            this.gc.submitAchievements([{identifier:achID, percentComplete:100}], callback);
        },
        resetAchievements : function(callback) {
            this.gc.resetAchievements(callback);
        },
        showAchievements : function(callback) {
            this.gc.showAchievements(function(error){
                if (callback)
                    callback(error);
            });
        }
    }

    CocoonJS.extend(CocoonJS.Social.SocialGamingServiceGameCenter, CocoonJS.Social.SocialGamingService);

    /**
     * @ignore
     */
    function fromGCPLayerToCocoonUser(player){
        return new CocoonJS.Social.User(player.playerID, player.alias);
    }
    /**
     * @ignore
     */
    function fromGCAchievementDescriptionToCocoonAchievement(ach) {
        return new CocoonJS.Social.Achievement(ach.identifier,ach.title, ach.achievedDescription,"", ach.maximumPoints);
    }
})();
