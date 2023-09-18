# LEI2JSON: Livestock Event Information To JSON

## Introduction

The **LEI2JSON** tool empowers livestock producers to effortlessly generate JSON data from a spreadsheet. It leverages a Google Spreadsheet as an interface, enabling producers to input data into a familiar tool, reducing the learning curve for new applications.

![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/56607112-0c2e-44ca-a3fb-72065994427f)


The application is designed to create a Google sheet template by extracting headers, notes, data types, and validation from a JSON schema. It performs validation and generates JSON data with options to copy, download, and save to Google Drive. **LEI2JSON** can be seamlessly integrated with other software, such as data analysis tools or data visualization software.

## Features

- **Simplified Data Entry**: Use your familiar Google Spreadsheet to enter livestock event data.

- **Automatic Template Creation**: Extract headers, notes, data types, and validation from a JSON schema.

- **Effortless JSON Generation**: Easily validate and generate JSON data.

- **Export Options**: Copy, download, or save your JSON data directly to Google Drive.

- **Integration-Ready**: Seamlessly integrate with other data analysis and visualization tools.

## Technologies

- <img src="https://www.iconpacks.net/icons/2/free-html-icon-1467-thumb.png" alt="HTML Icon" width="20"> HTML for the front end.
- <img src="https://cdn-icons-png.flaticon.com/512/2965/2965300.png" alt="JavaScript Icon" width="20"> Apps script for the back end.
- <img src="data:image/png;base64,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" alt="JSON Schema Icon" width="20"> JSON schema for the event.


## Getting Started
To use the LEI2JSON, you must have access to the Google Spreadsheet containing your livestock event data.

To use **LEI2JSON**, follow these simple steps:
1. Access the [LEI2JSON Google Spreadsheet][LEI2JSON].
2. Enter your livestock event data into the spreadsheet.
3. Use the tool to generate JSON data.

[![Watch the Getting Started Video](getting-started-thumbnail.png)](getting-started-video.mp4)

## Installations

### Clone the repository
git clone https://github.com/mahirgamal/LEI2JSON.git

### Coding Google Sheet

To set up LEI2JSON in your Google Sheet, follow these simple steps:
1. Open Google Sheet: Begin by opening your Google Sheet where you want to use LEI2JSON.
2. Access Apps Script:
   - Click on the **Extensions** menu at the top.
   - Choose **Apps Script** from the dropdown menu.
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/70f90644-37fe-48e0-9333-bbe0fa93a228)
3. Create Code.gs and Page.html Files:
   In the new Apps Script window:
   - On the left-hand side, click on the "Files" tab.
   - Select "New" and create two files: **Code.gs** and **Page.html**.
   - Copy and paste the desired code into these files.
  ![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/444fa1a8-a5bf-41d1-830f-3bc40731598f)

4. Save the project by clicking the floppy disk icon or pressing **Ctrl + S** (Windows) or **Command + S** (Mac).
5. Go back to your Google Sheet and refresh the page.

Now you're ready to use **LEI2JSON** within your Google Sheet:
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/c74200a4-f16d-464f-bcbd-7bcde07ca913)


## Contributing
If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.



## License
This project is licensed under Apache License 2.0 - see the [LICENSE][lic] file for details.

[//]: #
  [LEI2JSON]:  <https://docs.google.com/spreadsheets/d/1bY8gVCLbVUoGXgYd5DosBFXTjOZqGR4kK8yUstpqIBs/edit#gid=0>
  [lic]: <https://github.com/mahirgamal/LEI2JSON/blob/main/LICENSE>
  [html]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Page.html>
  [JavaScript]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Code.gs>
 
