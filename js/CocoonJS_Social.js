(function() {

    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
     * @namespace
     */
    CocoonJS.Social = {};

    /**
     * This class provides an abstraction API for all the Social Services
     * Each Social service has it's own official API but can also be used within this API interface
     * @class
     */
    CocoonJS.Social.SocialService = function() {
        /**
         * This {@link CocoonJS.EventHandler} object allows listening to events called when the user login status changes
         * The callback parameters: loggedIn status (boolean) and error
         * @memberOf CocoonJS.Social.SocialService
         */
        this.onLoginStatusChanged = new CocoonJS.EventHandler("", "dummy", "onLoginStatusChanged");

        return this;
    }

    CocoonJS.Social.SocialService.prototype = {

        /**
         * Check if the user is logged in.
         * @return {boolean} true if the user is still logged in, false otherwise.
         */
        isLoggedIn: function() {
             return false;
        },

        /**
         * Authenticate the user
         * @param {function} callback. The callback function. Response params: loggedIn(boolean) and error
         */
        login : function(callback) {
            if (callback)
                callback(false, {message:"Not implemented!"});
        },

        /**
         * Log the user out of your application.
         * @param {function} [callback] The callback function. Response params: error
         */
        logout: function(callback) {
            if (callback)
                callback({message:"Not implemented!"});
        },

        /**
         * Returns the information of the currently logged in user.
         * @return {@link CocoonJS.Social.User}
         */
        getLoggedInUser : function() {
            return null;
        },

        /**
         * Checks if the current logged in user has publish permissions
         * @param callback The callback function. Response params: permissions granted and error
         */
        hasPublishPermissions: function(callback) {
            callback(true);
        },

        /**
         * Requests publish permissions for the current logged in user
         * @param callback The callback function. Response params: granted and error
         */
        requestPublishPermissions: function(callback) {
            if (callback)
                callback(true, null);
        },
        /**
         * Retrieves user information for a specific user ID.
         * @param {function} callback The callback function. Response params: {@link CocoonJS.Social.User} and error.
         * @param {string} [userID] The id of the user to retrieve the information from. If no userID is specified, the currently logged in user is assumed.
         */
        requestUser: function(callback, userID) {
            callback(null, {message:"Not implemented!"});
        },
        /**
         * Request to retrieve the profile image of a user
         * @param {function} callback The callback function. Response params: ImageURL and error.
         * @param {string} [userID] The id of the user to get the image for. If no userID is specified, the currently logged user is used.
         * @param {CocoonJS.Social.ImageSize} [imageSize] The desired size of the image. Default value: SMALL.
         */
        requestUserImage : function(callback, userID, imageSize) {
            callback("", {message:"Not implemented!"})
        },

        /**
         * Retrieves user friends for a specific user ID.
         * @param {function} callback The callback function. Response params: Array of {@link CocoonJS.Social.User} and error.
         * @param {string} [userID] The id of the user to retrieve the information from. If no userID is specified, the currently logged in user is assumed.
         */
        requestFriends: function(callback, userID) {
            callback([], {message:"Not implemented!"});
        },

        /**
         * Shares a message without the intervention of the user
         * This action might require publish permissions. If the user has not publish permissions they are automatically requested.
         * @param {CocoonJS.Social.Message} message A object representing the information to be published.
         * @param {function} [callback] The callback function. Response params: error
         */
        publishMessage: function(message, callback) {
            callback({message:"Not implemented!"});
        },

        /**
         * Presents a native/web dialog that allows the user to share a message
         * @param {CocoonJS.Social.Message} message A object representing the information to be published.
         * @param {function} [callback] The callback function. Response params: error
         */
        publishMessageWithDialog: function(message, callback) {
            callback({message:"Not implemented!"});
        }
    }


    /**
     * This class extends the Social Service API with an extended Social Gaming abstraction API (achievements, leaderboards, etc.)
     * @class
     */
    CocoonJS.Social.SocialGamingService = function() {
        CocoonJS.Social.SocialGamingService.superclass.constructor.call(this);
        return this;
    }

    CocoonJS.Social.SocialGamingService.prototype = {

        _cachedAchievements: null,
        _achievementsMap: null,
        _leaderboardsTemplate: null,
        _achievementsTemplate: null,

        /**
         * Retrieves the score for a user from a specific leaderboard
         * @param {function} callback The callback function. Response params: {@link CocoonJS.Social.Score} and error.
         * @param {CocoonJS.Social.ScoreParams} [params] The params to retrieve the score. If no params are specified, the currently logged in user and the default leaderboard are assumed.
         */
        requestScore: function(callback, params) {
            callback(null, {message:"Not implemented!"})
        },

        /**
         * Submits the score for a user to a specific leaderboard
         * @param {number} score the score to submit
         * @param {function} [callback] The callback function. Response params: error.
         * @param {CocoonJS.Social.ScoreParams} [params] The params to submit the score. If no params are specified, the currently logged in user and the default leaderboard are assumed.
         */
        submitScore: function(score, callback, params ) {
            if (callback)
                callback({message:"Not implemented!"})
        },

        /**
         * Shows a modal leaderboard view using a platform dependant view.
         * @param {CocoonJS.Social.ScoreParams} [params] The params to choose the leaderboard and other settings. If no params are specified the default leaderboard id and settings will be assumed.
         * @param {function} [callback] The callback function invoked when the modal leaderboard view is closed by the user. Response params: error.
         * @see setTemplates
         */
        showLeaderboard : function(callback, params) {
            if (callback)
                callback({message:"Not implemented!"})
        },

        /**
         * Retrieves all the achievements of the application.
         * @param {function} callback The callback function. Response params: array of {@link CocoonJS.Social.Achievement} and error.
         */
        requestAllAchievements : function(callback) {
            callback([], {message:"Not implemented!"})
        },

        /**
         * Retrieves the achievements earned by a user.
         * @param {function} callback The callback function. Response params: array of {@link CocoonJS.Social.Achievement} and error.
         * @param {string} [userId] The id of the user to retrieve the information from. If no userID is specified, the currently logged in user is assumed.
         */
        requestAchievements : function(callback, userID) {
            callback([], {message:"Not implemented!"})
        },
        /**
         * Submits the achievement for the current logged In user
         * @param achievementID The achievement ID to submit
         * @param callback [callback] The callback function. Response params: error.
         */
        submitAchievement: function(achievementID, callback) {
            if (callback)
                callback({message:"Not implemented!"})
        },
        /**
         * Resets all the achievements of the current logged in user
         * @param {function} [callback] The callback function. Response params: error.
         */
        resetAchievements : function(callback) {
            if (callback)
                callback([], {message:"Not implemented!"})
        },
        /**
         * Shows a modal achievements view using a platform dependant view.
         * @param {function} [callback] The callback function invoked when the modal achievements view is closed by the user. Response params: error.
         * @see setTemplates
         */
        showAchievements : function(callback) {
            if (!this._achievementsTemplate)
                throw "Please, provide a html template for achievements with the setTemplates method";
            var dialog = new CocoonJS.App.WebDialog();
            var callbackSent = false;
            dialog.show(this._achievementsTemplate, function(error) {
                dialog.closed = true;
                if (!callbackSent && callback)
                    callback(error);
            });
            var me = this;
            this.requestAchievements(function(achievements, error){
                if (dialog.closed)
                    return;
                if (error) {
                    callbackSent = true;
                    if (callback)
                        callback(error);
                    return;
                }

                var achs = [];
                if (me._cachedAchievements) {
                    for (var i = 0; i < me._cachedAchievements.length; ++i) {
                        var ach = me._cachedAchievements[i];
                        achs.push(ach);
                        if (achievements && achievements.length) {
                            for (var j = 0; j< achievements.length; ++j) {
                                if (achievements[j].achievementID === ach.achievementID) {
                                    ach.achieved = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                var js = "addAchievements(" + JSON.stringify(achs) + ");";
                dialog.eval(js);
            });
        },

        /**
         * Set the map for using custom achievement IDs.
         * The map must be a customID to realID map (accessing map.customID must return the real achievement ID)
         * Whenever this map is enabled users are able to submit achievements with the real achievement ID or with the custom one.
         * @params {object} map The achievements map. A null map disables this feature.
         */
        setAchievementsMap: function(map) {
            this._achievementsMap = map;
            if (this._cachedAchievements) {
               this.syncAchievementsMap(this._cachedAchievements);
            }
        },

        /**
         * Provides some templates to be used in the leaderboards and achievements views
         * Some social services (like Facebook) don't have a native view to show achievements or leaderboards views, and use html templates instead
         * @param {string} leaderboardsTemplate relative path to the leaderboards template
         * @param {string} achievementsTemplate relative path to the achievements template
         * @see showAchievements
         * @see showLeaderboard
         */
        setTemplates: function(leaderboardsTemplate, achievementsTemplate) {
            this._leaderboardsTemplate = leaderboardsTemplate;
            this._achievementsTemplate = achievementsTemplate;
        },

        //Internal utility methods

        /**
         * @ignore
         */
        setCachedAchievements: function(achievements) {
            this._cachedAchievements = achievements;
            if (achievements && this._achievementsMap) {
                this.syncAchievementsMap(this._cachedAchievements);
            }
        },

        /**
         * @ignore
         */
        findAchievement: function(id) {
            if (!this._cachedAchievements)
                return null;
            for (var i = 0; i < this._cachedAchievements.length; ++i) {
                if (id === this._cachedAchievements[i].achievementID) {
                    return this._cachedAchievements[i];
                }
            }
            return null;
        },

        /**
         * @ignore
         */
        translateAchievementID: function(id) {
            if (this._achievementsMap) {
                for (var customID in this._achievementsMap) {
                    if (customID == id) { //important: compare with double equal, because id can be numeric
                        return this._achievementsMap[customID];
                    }
                }
            }
            return id;
        },
        /**
         * @ignore
         * @param {array} achievements array of achievements
         */
        syncAchievementsMap: function(achievements) {
            if (!this._achievementsMap)
                return;
            for (var i = 0; i< achievements.length; ++i) {
                for (var customID in this._achievementsMap) {
                     if (this._achievementsMap[customID] === achievements[i].achievementID) {
                         achievements[i].customID = customID;
                     }
                }
            }

        }
    }

    /**
     * @ignore
     */
    CocoonJS.extend(CocoonJS.Social.SocialGamingService, CocoonJS.Social.SocialService);


    /**
     * This enumeration represents the possible images to be obtained for a user in the social gaming extension.
     * @namespace
     * @enum
     */
    CocoonJS.Social.ImageSize =
    {
        /**
         * Represent a thumbnail like image size.
         */
        THUMB : "thumb",
        /**
         * Represents the small image size.
         */
        SMALL : "small",
        /**
         * Represents the medium image size.
         */
        MEDIUM : "medium",
        /**
         * Represents the large image size.
         */
        LARGE : "large"
    };


    /**
     * The data structure that represents the information of a user inside the social gaming extension.
     * @class
     * @constructor
     * @param {string} userID The id of the user.
     * @param {string} userName The user name of the user.
     */
    CocoonJS.Social.User = function(userID, userName, userImage)
    {
        /**
         * The id of the user.
         * @field
         * @type string
         */
        this.userID = userID;
        /**
         * The user name of the user.
         * @field
         * @type string
         */
        this.userName = userName;

        /**
         * The user image URL
         * If the image URL is not provided by default fetch it using requestUserImage method.
         * @field
         * @type {string}
         */
        this.userImage = userImage;

        return this;
    };

    /**
     * This type represents a message to be published.
     * @class
     * @constructor
     * @param {string} message The message to be published.
     * @param {string} mediaURL An URL to a media (image, video, ...)
     * @param {string} linkURL An URL to add to the message so the user can click on that link to get more information.
     * @param {string} linkText The text that will appear in the message link.
     * @param {string} linkCaption The text caption that will appear in the message link.
     */
    CocoonJS.Social.Message = function(message, mediaURL, linkURL, linkText, linkCaption)
    {
        /**
         * The message to be published.
         * @field
         * @type string
         */
        this.message = message;
        /**
         * An URL to a media (image, video, ...)
         * @field
         * @type string
         */
        this.mediaURL = mediaURL;
        /**
         * An URL to add to the message so the user can click on that link to get more information.
         * @field
         * @type string
         */
        this.linkURL = linkURL;
        /**
         * The text that will appear in the message link.
         * @field
         * @type string
         */
        this.linkText = linkText;
        /**
         * The text caption that will appear in the message link.
         * @field
         * @type string
         */
        this.linkCaption = linkCaption;

        return this;
    };


    /**
     * The data structure that represents the information of the user score in the application.
     * @class
     * @constructor
     * @param {string} userID The user id.
     * @param {number} score The score of the user.
     * @param {string} userName The name of the user.
     * @param {string} imageURL The url of the user image.
     * @param {number} leaderboardID The id of the leaderboard the score belongs to.
     */
    CocoonJS.Social.Score = function(userID, score, userName, imageURL, leaderboardID)
    {
        /**
         * The user id.
         * @type string
         */
        this.userID = userID;
        /**
         * The score of the user.
         * @type number
         */
        this.score = score || 0;
        /**
         * The name of the user.
         * @type string
         */
        this.userName = userName;
        /**
         * The url of the user image.
         * @type string
         */
        this.imageURL = imageURL;
        /**
         * The id of the leaderboard the score belongs to.
         * @type string
         */
        this.leaderboardID = leaderboardID;

        return this;
    };

    /**
     * The data structure that represents params to retrieve or submit scores
     * @class
     * @constructor
     * @param {string} userID The user id. If no userID is specified the current logged in user is assumed.
     * @param {string} leaderboardID The leaderboard ID. If no leaderboard is specified the default leaderboard is assumed.
     * @param {boolean} [friendScope = false] If enabled the query will get only scores from friends in the social network
     * @param {CocoonJS.Social.TimeScope} [timeScope=0] The time scope for the scores.
     */
    CocoonJS.Social.ScoreParams = function(userID, leaderboardID, friends, timeScope) {
        /**
         * The user id.
         * @type string
         */
        this.userID = userID;
        /**
         * The id of the leaderboard.
         * @type string
         */
        this.leaderboardID = leaderboardID;

        /**
         * Friends scope
         * @type {boolean}
         */
        this.friends = !!friends;

        /**
         * The time scope
         * @type {number}
         */
        this.timeScope = timeScope || 2;
    }

    /**
     * @enum
     * This enumeration represents the possible Time Scopes for a leaderboad query.
     */
    CocoonJS.Social.TimeScope =
    {
        ALL_TIME: 0,
        WEEK: 1,
        TODAY:2
    };

    /**
     * The data structure that represents the information of an achievement in the application.
     * @class
     * @constructor
     * @param {string} achievementID The id of the achievement info.
     * @param {string} title The title of the achievement.
     * @param {string} description The description of the achievement.
     * @param {string} imageURL The url to the image representing the achievement.
     * @param {number} points The points value of the achievement
     */
    CocoonJS.Social.Achievement = function(achievementID, title, description, imageURL, points)
    {
        /**
         * The id of the achievement.
         * @type string
         */
        this.achievementID = achievementID;
        /**
         * The optional custom id of the achievement defined by the user.
         * @type string
         */
        this.customID = achievementID;
        /**
         * The title of the achievement.
         * @type string
         */
        this.title = title;
        /**
         * The description of the achievement.
         * @type string
         */
        this.description = description;
        /**
         * The url to the image representing the achievement.
         * @type string
         */
        this.imageURL = imageURL;
        /**
         * The points value of the achievement
         * @type number
         */
        this.points = points || 0;

        return this;
    };

})()