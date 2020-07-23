/**
*This library was generated from 'https://aghisna.xyz/libgram.php?source=javascript&optional=true'
*Repository Library : https://github.com/Aghisna12/Telegram-Library-Generator
*Date : 2020-07-23 11:05:26

*Library Name : Telegram
*Language Code : Google Script(gs)
*Credits : Aghisna12
*/

class Telegram {

	/**
	*initialize constructor
	*/
	constructor(token) {
		this.token = token;
		this.urlapi = 'https://api.telegram.org/bot';
	}

	/**
	*request api telegram
	*/
	requestApi(method, data) {
		var hasil = {};
		if (!this.token) {
			hasil['response'] = 'failed';
			hasil['data'] = 'Bot Token is required';
			return hasil;
		}
		if (!method) {
			hasil['response'] = 'failed';
			hasil['data'] = 'Method is required';
			return hasil;
		} else {
			hasil['method'] = method;
		}
		var options = {
			'method':'post',
			'contentType':'application/json'
		};
		if (data) {
			options['payload'] = JSON.stringify(data);
		}
		var response = UrlFetchApp.fetch(this.urlapi + this.token + '/' + method, options);
		if (response && response.getResponseCode()) {
			hasil['response'] = response.getResponseCode();
			if (response.getContentText()) {
				hasil['data'] = response.getContentText();
			}
		}
		return hasil;
	}

	/**
	*build query from array
	*/
	buildQuery(array) {
		var query = {}
		if (array) {
			for (var index in array) {
				if (array[index]) {
					var value = array[index];
					if (index == 'optionals') {
						for (var ix in value) {
							if (value[ix]) {
								query[ix] = value[ix];
							}
						}
					} else {
						query[index] = value;
					}
				}
			}
		}
		return query;
	}

	/**
	*A simple method for testing your bot's auth token. Requires no parameters. Returns basic information about the bot in form of a User object.
	*/
	getMe() {
		return this.requestApi('getMe');
	}

	/**
	*Use this method to send text messages. On success, the sent Message is returned.
	*/
	sendMessage(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Text of the message to be sent, 1-4096 characters after entities parsing
		text, //String

		optionals
		/**
		//Mode for parsing entities in the message text. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Disables link previews for links in this message
		*disable_web_page_preview, //Boolean (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendMessage', this.buildQuery({
			'chat_id':chat_id,
			'text':text,
			'optionals':optionals
			/**
			*'parse_mode':parse_mode,
			*'disable_web_page_preview':disable_web_page_preview,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*The Bot API supports basic formatting for messages. You can use bold, italic, underlined and strikethrough text, as well as inline links and pre-formatted code in your bots' messages. Telegram clients will render them accordingly. You can use either markdown-style or HTML-style formatting.Note that Telegram clients will display an alert to the user before opening an inline link ('Open this link?' together with the full URL).Message entities can be nested, providing following restrictions are met:
- If two entities has common characters then one of them is fully contained inside another.
- bold, italic, underline and strikethrough entities can contain and to be contained in any other entities, except pre and code.
- All other entities can't contain each other.Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username. Please note:To use this mode, pass MarkdownV2 in the parse_mode field. Use the following syntax in your message:Please note:To use this mode, pass HTML in the parse_mode field. The following tags are currently supported:Please note:This is a legacy mode, retained for backward compatibility. To use this mode, pass Markdown in the parse_mode field. Use the following syntax in your message:Please note:
	*
	*Formatting options() {
	*}
	*/

	/**
	*Use this method to forward messages of any kind. On success, the sent Message is returned.
	*/
	forwardMessage(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
		from_chat_id, //Integer or String

		//Message identifier in the chat specified in from_chat_id
		message_id, //Integer

		optionals
		/**
		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		*/
	) {
		return this.requestApi('forwardMessage', this.buildQuery({
			'chat_id':chat_id,
			'from_chat_id':from_chat_id,
			'message_id':message_id,
			'optionals':optionals
			/**
			*'disable_notification':disable_notification,
			*/
		}));
	}

	/**
	*Use this method to send photos. On success, the sent Message is returned.
	*/
	sendPhoto(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. More info on Sending Files »
		photo, //InputFile or String

		optionals
		/**
		//Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the photo caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendPhoto', this.buildQuery({
			'chat_id':chat_id,
			'photo':photo,
			'optionals':optionals
			/**
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.For sending voice messages, use the sendVoice method instead.
	*/
	sendAudio(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More info on Sending Files »
		audio, //InputFile or String

		optionals
		/**
		//Audio caption, 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the audio caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Duration of the audio in seconds
		*duration, //Integer (Optional)

		//Performer
		*performer, //String (Optional)

		//Track name
		*title, //String (Optional)

		//Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
		*thumb, //InputFile or String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendAudio', this.buildQuery({
			'chat_id':chat_id,
			'audio':audio,
			'optionals':optionals
			/**
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'duration':duration,
			*'performer':performer,
			*'title':title,
			*'thumb':thumb,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
	*/
	sendDocument(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More info on Sending Files »
		document, //InputFile or String

		optionals
		/**
		//Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
		*thumb, //InputFile or String (Optional)

		//Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the document caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendDocument', this.buildQuery({
			'chat_id':chat_id,
			'document':document,
			'optionals':optionals
			/**
			*'thumb':thumb,
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
	*/
	sendVideo(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More info on Sending Files »
		video, //InputFile or String

		optionals
		/**
		//Duration of sent video in seconds
		*duration, //Integer (Optional)

		//Video width
		*width, //Integer (Optional)

		//Video height
		*height, //Integer (Optional)

		//Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
		*thumb, //InputFile or String (Optional)

		//Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the video caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Pass True, if the uploaded video is suitable for streaming
		*supports_streaming, //Boolean (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendVideo', this.buildQuery({
			'chat_id':chat_id,
			'video':video,
			'optionals':optionals
			/**
			*'duration':duration,
			*'width':width,
			*'height':height,
			*'thumb':thumb,
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'supports_streaming':supports_streaming,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
	*/
	sendAnimation(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. More info on Sending Files »
		animation, //InputFile or String

		optionals
		/**
		//Duration of sent animation in seconds
		*duration, //Integer (Optional)

		//Animation width
		*width, //Integer (Optional)

		//Animation height
		*height, //Integer (Optional)

		//Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
		*thumb, //InputFile or String (Optional)

		//Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the animation caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendAnimation', this.buildQuery({
			'chat_id':chat_id,
			'animation':animation,
			'optionals':optionals
			/**
			*'duration':duration,
			*'width':width,
			*'height':height,
			*'thumb':thumb,
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
	*/
	sendVoice(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More info on Sending Files »
		voice, //InputFile or String

		optionals
		/**
		//Voice message caption, 0-1024 characters after entities parsing
		*caption, //String (Optional)

		//Mode for parsing entities in the voice message caption. See formatting options for more details.
		*parse_mode, //String (Optional)

		//Duration of the voice message in seconds
		*duration, //Integer (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendVoice', this.buildQuery({
			'chat_id':chat_id,
			'voice':voice,
			'optionals':optionals
			/**
			*'caption':caption,
			*'parse_mode':parse_mode,
			*'duration':duration,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent Message is returned.
	*/
	sendVideoNote(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More info on Sending Files ». Sending video notes by a URL is currently unsupported
		video_note, //InputFile or String

		optionals
		/**
		//Duration of sent video in seconds
		*duration, //Integer (Optional)

		//Video width and height, i.e. diameter of the video message
		*length, //Integer (Optional)

		//Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
		*thumb, //InputFile or String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendVideoNote', this.buildQuery({
			'chat_id':chat_id,
			'video_note':video_note,
			'optionals':optionals
			/**
			*'duration':duration,
			*'length':length,
			*'thumb':thumb,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send a group of photos or videos as an album. On success, an array of the sent Messages is returned.
	*/
	sendMediaGroup(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//A JSON-serialized array describing photos and videos to be sent, must include 2-10 items
		media, //Array of InputMediaPhoto and InputMediaVideo

		optionals
		/**
		//Sends the messages silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the messages are a reply, ID of the original message
		*reply_to_message_id //Integer (Optional)
		*/
	) {
		return this.requestApi('sendMediaGroup', this.buildQuery({
			'chat_id':chat_id,
			'media':media,
			'optionals':optionals
			/**
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id
			*/
		}));
	}

	/**
	*Use this method to send point on the map. On success, the sent Message is returned.
	*/
	sendLocation(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Latitude of the location
		latitude, //Float number

		//Longitude of the location
		longitude, //Float number

		optionals
		/**
		//Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400.
		*live_period, //Integer (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendLocation', this.buildQuery({
			'chat_id':chat_id,
			'latitude':latitude,
			'longitude':longitude,
			'optionals':optionals
			/**
			*'live_period':live_period,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
	*/
	editMessageLiveLocation(
		//Latitude of new location
		latitude, //Float number

		//Longitude of new location
		longitude, //Float number

		optionals
		/**
		//Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		*chat_id, //Integer or String (Optional)

		//Required if inline_message_id is not specified. Identifier of the message to edit
		*message_id, //Integer (Optional)

		//Required if chat_id and message_id are not specified. Identifier of the inline message
		*inline_message_id, //String (Optional)

		//A JSON-serialized object for a new inline keyboard.
		*reply_markup //InlineKeyboardMarkup (Optional)
		*/
	) {
		return this.requestApi('editMessageLiveLocation', this.buildQuery({
			'latitude':latitude,
			'longitude':longitude,
			'optionals':optionals
			/**
			*'chat_id':chat_id,
			*'message_id':message_id,
			*'inline_message_id':inline_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to stop updating a live location message before live_period expires. On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
	*/
	stopMessageLiveLocation(
		optionals
		/**
		//Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		*chat_id, //Integer or String (Optional)

		//Required if inline_message_id is not specified. Identifier of the message with live location to stop
		*message_id, //Integer (Optional)

		//Required if chat_id and message_id are not specified. Identifier of the inline message
		*inline_message_id, //String (Optional)

		//A JSON-serialized object for a new inline keyboard.
		*reply_markup //InlineKeyboardMarkup (Optional)
		*/
	) {
		return this.requestApi('stopMessageLiveLocation', this.buildQuery({
			'optionals':optionals
			/**
			*'chat_id':chat_id,
			*'message_id':message_id,
			*'inline_message_id':inline_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send information about a venue. On success, the sent Message is returned.
	*/
	sendVenue(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Latitude of the venue
		latitude, //Float number

		//Longitude of the venue
		longitude, //Float number

		//Name of the venue
		title, //String

		//Address of the venue
		address, //String

		optionals
		/**
		//Foursquare identifier of the venue
		*foursquare_id, //String (Optional)

		//Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
		*foursquare_type, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendVenue', this.buildQuery({
			'chat_id':chat_id,
			'latitude':latitude,
			'longitude':longitude,
			'title':title,
			'address':address,
			'optionals':optionals
			/**
			*'foursquare_id':foursquare_id,
			*'foursquare_type':foursquare_type,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send phone contacts. On success, the sent Message is returned.
	*/
	sendContact(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Contact's phone number
		phone_number, //String

		//Contact's first name
		first_name, //String

		optionals
		/**
		//Contact's last name
		*last_name, //String (Optional)

		//Additional data about the contact in the form of a vCard, 0-2048 bytes
		*vcard, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendContact', this.buildQuery({
			'chat_id':chat_id,
			'phone_number':phone_number,
			'first_name':first_name,
			'optionals':optionals
			/**
			*'last_name':last_name,
			*'vcard':vcard,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send a native poll. On success, the sent Message is returned.
	*/
	sendPoll(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Poll question, 1-255 characters
		question, //String

		//A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
		options, //Array of String

		optionals
		/**
		//True, if the poll needs to be anonymous, defaults to True
		*is_anonymous, //Boolean (Optional)

		//Poll type, “quiz” or “regular”, defaults to “regular”
		*type, //String (Optional)

		//True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False
		*allows_multiple_answers, //Boolean (Optional)

		//0-based identifier of the correct answer option, required for polls in quiz mode
		*correct_option_id, //Integer (Optional)

		//Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
		*explanation, //String (Optional)

		//Mode for parsing entities in the explanation. See formatting options for more details.
		*explanation_parse_mode, //String (Optional)

		//Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
		*open_period, //Integer (Optional)

		//Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period.
		*close_date, //Integer (Optional)

		//Pass True, if the poll needs to be immediately closed. This can be useful for poll preview.
		*is_closed, //Boolean (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendPoll', this.buildQuery({
			'chat_id':chat_id,
			'question':question,
			'options':options,
			'optionals':optionals
			/**
			*'is_anonymous':is_anonymous,
			*'type':type,
			*'allows_multiple_answers':allows_multiple_answers,
			*'correct_option_id':correct_option_id,
			*'explanation':explanation,
			*'explanation_parse_mode':explanation_parse_mode,
			*'open_period':open_period,
			*'close_date':close_date,
			*'is_closed':is_closed,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
	*/
	sendDice(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		optionals
		/**
		//Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, or “🏀”. Dice can have values 1-6 for “🎲” and “🎯”, and values 1-5 for “🏀”. Defaults to “🎲”
		*emoji, //String (Optional)

		//Sends the message silently. Users will receive a notification with no sound.
		*disable_notification, //Boolean (Optional)

		//If the message is a reply, ID of the original message
		*reply_to_message_id, //Integer (Optional)

		//Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
		*reply_markup //InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply (Optional)
		*/
	) {
		return this.requestApi('sendDice', this.buildQuery({
			'chat_id':chat_id,
			'optionals':optionals
			/**
			*'emoji':emoji,
			*'disable_notification':disable_notification,
			*'reply_to_message_id':reply_to_message_id,
			*'reply_markup':reply_markup
			*/
		}));
	}

	/**
	*Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot.We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
	*/
	sendChatAction(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('sendChatAction', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
	*/
	getUserProfilePhotos(
		//Unique identifier of the target user
		user_id, //Integer

		optionals
		/**
		//Sequential number of the first photo to be returned. By default, all photos are returned.
		*offset, //Integer (Optional)

		//Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
		*limit //Integer (Optional)
		*/
	) {
		return this.requestApi('getUserProfilePhotos', this.buildQuery({
			'user_id':user_id,
			'optionals':optionals
			/**
			*'offset':offset,
			*'limit':limit
			*/
		}));
	}

	/**
	*Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received.
	*/
	getFile() {
		return this.requestApi('getFile');
	}

	/**
	*Use this method to kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
	kickChatMember(
		//Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername)
		chat_id, //Integer or String

		//Unique identifier of the target user
		user_id, //Integer

		optionals
		/**
		//Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
		*until_date //Integer (Optional)
		*/
	) {
		return this.requestApi('kickChatMember', this.buildQuery({
			'chat_id':chat_id,
			'user_id':user_id,
			'optionals':optionals
			/**
			*'until_date':until_date
			*/
		}));
	}

	/**
	*Use this method to unban a previously kicked user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. Returns True on success.
	*/
	unbanChatMember(
		//Unique identifier for the target group or username of the target supergroup or channel (in the format @username)
		chat_id, //Integer or String

	) {
		return this.requestApi('unbanChatMember', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
	*/
	restrictChatMember(
		//Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
		chat_id, //Integer or String

		//Unique identifier of the target user
		user_id, //Integer

		//A JSON-serialized object for new user permissions
		permissions, //ChatPermissions

		optionals
		/**
		//Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever
		*until_date //Integer (Optional)
		*/
	) {
		return this.requestApi('restrictChatMember', this.buildQuery({
			'chat_id':chat_id,
			'user_id':user_id,
			'permissions':permissions,
			'optionals':optionals
			/**
			*'until_date':until_date
			*/
		}));
	}

	/**
	*Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user. Returns True on success.
	*/
	promoteChatMember(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Unique identifier of the target user
		user_id, //Integer

		optionals
		/**
		//Pass True, if the administrator can change chat title, photo and other settings
		*can_change_info, //Boolean (Optional)

		//Pass True, if the administrator can create channel posts, channels only
		*can_post_messages, //Boolean (Optional)

		//Pass True, if the administrator can edit messages of other users and can pin messages, channels only
		*can_edit_messages, //Boolean (Optional)

		//Pass True, if the administrator can delete messages of other users
		*can_delete_messages, //Boolean (Optional)

		//Pass True, if the administrator can invite new users to the chat
		*can_invite_users, //Boolean (Optional)

		//Pass True, if the administrator can restrict, ban or unban chat members
		*can_restrict_members, //Boolean (Optional)

		//Pass True, if the administrator can pin messages, supergroups only
		*can_pin_messages, //Boolean (Optional)

		//Pass True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by him)
		*can_promote_members //Boolean (Optional)
		*/
	) {
		return this.requestApi('promoteChatMember', this.buildQuery({
			'chat_id':chat_id,
			'user_id':user_id,
			'optionals':optionals
			/**
			*'can_change_info':can_change_info,
			*'can_post_messages':can_post_messages,
			*'can_edit_messages':can_edit_messages,
			*'can_delete_messages':can_delete_messages,
			*'can_invite_users':can_invite_users,
			*'can_restrict_members':can_restrict_members,
			*'can_pin_messages':can_pin_messages,
			*'can_promote_members':can_promote_members
			*/
		}));
	}

	/**
	*Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
	*/
	setChatAdministratorCustomTitle(
		//Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
		chat_id, //Integer or String

		//Unique identifier of the target user
		user_id, //Integer

	) {
		return this.requestApi('setChatAdministratorCustomTitle', this.buildQuery({
			'chat_id':chat_id,
			'user_id':user_id,
		}));
	}

	/**
	*Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights. Returns True on success.
	*/
	setChatPermissions(
		//Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('setChatPermissions', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to generate a new invite link for a chat; any previously generated link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns the new invite link as String on success.Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink — after this the link will become available to the bot via the getChat method. If your bot needs to generate a new invite link replacing its previous one, use exportChatInviteLink again.
	*/
	exportChatInviteLink() {
		return this.requestApi('exportChatInviteLink');
	}

	/**
	*Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
	setChatPhoto(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('setChatPhoto', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
	deleteChatPhoto() {
		return this.requestApi('deleteChatPhoto');
	}

	/**
	*Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
	setChatTitle(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('setChatTitle', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
	*/
	setChatDescription(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		optionals
		/**
		//New chat description, 0-255 characters
		*description //String (Optional)
		*/
	) {
		return this.requestApi('setChatDescription', this.buildQuery({
			'chat_id':chat_id,
			'optionals':optionals
			/**
			*'description':description
			*/
		}));
	}

	/**
	*Use this method to pin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
	*/
	pinChatMessage(
		//Unique identifier for the target chat or username of the target channel (in the format @channelusername)
		chat_id, //Integer or String

		//Identifier of a message to pin
		message_id, //Integer

		optionals
		/**
		//Pass True, if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels.
		*disable_notification //Boolean (Optional)
		*/
	) {
		return this.requestApi('pinChatMessage', this.buildQuery({
			'chat_id':chat_id,
			'message_id':message_id,
			'optionals':optionals
			/**
			*'disable_notification':disable_notification
			*/
		}));
	}

	/**
	*Use this method to unpin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
	*/
	unpinChatMessage() {
		return this.requestApi('unpinChatMessage');
	}

	/**
	*Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
	*/
	leaveChat() {
		return this.requestApi('leaveChat');
	}

	/**
	*Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
	*/
	getChat() {
		return this.requestApi('getChat');
	}

	/**
	*Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
	*/
	getChatAdministrators() {
		return this.requestApi('getChatAdministrators');
	}

	/**
	*Use this method to get the number of members in a chat. Returns Int on success.
	*/
	getChatMembersCount() {
		return this.requestApi('getChatMembersCount');
	}

	/**
	*Use this method to get information about a member of a chat. Returns a ChatMember object on success.
	*/
	getChatMember(
		//Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('getChatMember', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	*/
	setChatStickerSet(
		//Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
		chat_id, //Integer or String

	) {
		return this.requestApi('setChatStickerSet', this.buildQuery({
			'chat_id':chat_id,
		}));
	}

	/**
	*Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
	*/
	deleteChatStickerSet() {
		return this.requestApi('deleteChatStickerSet');
	}

	/**
	*Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @Botfather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
	*/
	answerCallbackQuery(
		//Unique identifier for the query to be answered
		callback_query_id, //String

		optionals
		/**
		//Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
		*text, //String (Optional)

		//If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
		*show_alert, //Boolean (Optional)

		//URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @Botfather, specify the URL that opens your game — note that this will only work if the query comes from a callback_game button.
		//
		//Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
		*url, //String (Optional)

		//The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0.
		*cache_time //Integer (Optional)
		*/
	) {
		return this.requestApi('answerCallbackQuery', this.buildQuery({
			'callback_query_id':callback_query_id,
			'optionals':optionals
			/**
			*'text':text,
			*'show_alert':show_alert,
			*'url':url,
			*'cache_time':cache_time
			*/
		}));
	}

	/**
	*Use this method to change the list of the bot's commands. Returns True on success.
	*/
	setMyCommands() {
		return this.requestApi('setMyCommands');
	}

	/**
	*Use this method to get the current list of the bot's commands. Requires no parameters. Returns Array of BotCommand on success.
	*/
	getMyCommands() {
		return this.requestApi('getMyCommands');
	}

	/**
	*Methods and objects used in the inline mode are described in the Inline mode section.
	*
	*Inline mode methods() {
	*}
	*/

}
