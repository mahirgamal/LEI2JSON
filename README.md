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
- <img src="https://w7.pngwing.com/pngs/124/578/png-transparent-json-computer-icons-jar-jar-angle-text-rectangle-thumbnail.png" alt="JSON Schema Icon" width="20"> JSON schema for the event.


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
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/ddcc4377-2f7c-4600-a0f0-4179b1206ed6)
3. Create Code.gs and Page.html Files:
   In the new Apps Script window:
   - On the left-hand side, click **+** on the **Files** tab.
   - Select "New" and create two files: **Code.gs** and **Page.html**.
   - Copy and paste the desired code into these files.
  ![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/4829d1e4-ad5d-4bc6-9553-9226caa483e4)
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
 
