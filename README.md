## Storing Emails in Google Sheets

This is a simple script that lets you store user credentials/ email of users from your website to google sheets by creating an API using Google Apps Script.

### Usage
- Create a new Google Sheet.
- Go to `Extension` > `Apps Script`.
- Paste the code from `code.gs` and make any changes if required.
- Click __Deploy__ > __New Deployment__.
- Select type of deployment as a `Web App`.
- Provide description if needed and allow it to be accessed by anyone so the API will be easier to use.
- Click __Deploy__ and copy the web link.

__Note:__
 You may be asked to __Authorize__ the application as it has rights to add data to spreadsheet, so provide it with proper permissions.

You can now do POST request to the URL in this format:
```json
{"email" : "mail@email.com" }
```


The script will return any of the responses according to the situation:
- On success:
```json
{ "success": true, "message": "Email added successfully" }
```
- If the email is invalid or already exists:
```json
{ "success": false, "message": "Invalid email provided" }
```
- If email already exists
```json
{ "success": false, "message": "Email already exists" }
```