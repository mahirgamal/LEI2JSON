# LEI2JSON: Livestock Event Information To JSON

## Introduction

The **LEI2JSON** tool empowers livestock producers to effortlessly generate JSON data from a spreadsheet. It leverages a Google Spreadsheet as an interface, enabling producers to input data into a familiar tool, reducing the learning curve for new applications.

![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/09588795-798b-4b78-85af-09636a8a27ab)

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

https://github.com/mahirgamal/LEI2JSON/assets/86919381/874fd6bd-0513-4512-9f80-eb838300222d

## Installations

### Clone the repository
git clone https://github.com/mahirgamal/LEI2JSON.git

### Coding Google Sheet

To set up LEI2JSON in your Google Sheet, follow these simple steps:
1. Open Google Sheet: Begin by opening your Google Sheet where you want to use LEI2JSON.
2. Access Apps Script:
   - Click on the **Extensions** menu at the top.
   - Choose **Apps Script** from the dropdown menu.
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/eb49db32-4220-4233-9a96-6b5999169f67)
3. Create Code.gs and Page.html Files:
   In the new Apps Script window:
   - On the left-hand side, click **+** on the **Files** tab.
   - Select "New" and create two files: **Code.gs** and **Page.html**.
   - Copy and paste the desired code into these files ([HTML][html] [Apps Script][JavaScript]).
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/435e2033-56ec-4c34-b9e0-6035b1fc5e0a)
4. Save the project by clicking the floppy disk icon or pressing **Ctrl + S** (Windows) or **Command + S** (Mac).
5. Go back to your Google Sheet and refresh the page.

Now you're ready to use **LEI2JSON** within your Google Sheet:
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/4bce8c04-db0a-4797-aaf5-790c9f283fac)
## Troubleshooting
If you encounter any issues or have questions, please check our [FAQ](#FAQ) section for solutions. If your problem persists, feel free to [contact us](#Contact).

## FAQ
**Q1: Is the order of columns in the spreadsheet important when using your add-on?**

A1: No, the order of columns in the spreadsheet is not crucial when using our add-on. We've designed it to be flexible, allowing farmers to rearrange columns as needed without affecting the generated JSON data. This flexibility provides you with greater control over your data management process.

**Q2: Could you explain more about the bidirectional functionality of your add-on?**

A2: Our add-on offers bidirectional functionality, which means it can work in both directions. It can build column headers from a JSON schema, allowing you to set up your spreadsheet structure, and it can also generate JSON data from the populated spreadsheet. This bidirectional capability simplifies the process of managing and working with data, making it a versatile tool for various tasks.

**Q3: What is the JSON schema (LEI) that your add-on uses for generating and validating JSON data?**

A3: Our add-on utilises a predefined JSON schema called [LEI](https://github.com/mahirgamal/LEI-schema) (Livestock Event Information) to facilitate the generation and validation of JSON data. This schema serves as a structured template that defines livestock event data's expected format and structure. It ensures that the generated JSON data adheres to a consistent and standardised format, making it easier to work with and analyse.

## Team

Meet the dedicated team behind LEI2JSON:

- [**Mahir Habib**](https://researchoutput.csu.edu.au/en/persons/mahir-habib) - (PhD Student)
- [**Ashad Kabir**](https://researchoutput.csu.edu.au/en/persons/akabircsueduau) - Associate Professor in Computer Science (Project Lead and Principal Supervisor)
- [**Lihong Zheng**](https://researchoutput.csu.edu.au/en/persons/lzhengcsueduau) - Associate Professor in Computer Science (Co-supervisor)

## Contributing
If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Acknowledgments
We acknowledge that this work originates from the Trakka project and builds on the existing TerraCipher Trakka implementation. We appreciate the support and resources provided by the Trakka project team. Also, we thank Dave Swain and Will Swain from TerraCipher for their guidance and assistance throughout **LEI2JSON**.


## License
This project is licensed under Apache License 2.0 - see the [LICENSE][lic] file for details.

## Contact
If you have any questions, suggestions or need assistance, please don't hesitate to contact us at mhabib@csu.edu.au, akabir@csu.edu.au.

[//]: #
  [LEI2JSON]:  <https://docs.google.com/spreadsheets/d/1bY8gVCLbVUoGXgYd5DosBFXTjOZqGR4kK8yUstpqIBs/edit#gid=0>
  [lic]: <https://github.com/mahirgamal/LEI2JSON/blob/main/LICENSE>
  [html]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Page.html>
  [JavaScript]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Code.gs>
 
