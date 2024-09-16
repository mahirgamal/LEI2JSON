
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

To set up LEI2JSON in your Google Sheet, please follow the steps below:
1. **Create a New Google Sheet**: Open Google Sheets and start a new document.
2. **Access the Script Editor**: In the Google Sheets menu, go to `Extensions > Apps Script`.
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/eb49db32-4220-4233-9a96-6b5999169f67)
3. **Create Code.gs and Page.html Files**:
   - In the new Apps Script window:
	 - [ ] On the left-hand side, click **$+$** on the **Files** tab.
![image](https://github.com/mahirgamal/LEI2JSON/assets/86919381/d0a284c6-669c-4d71-b47d-bb8b03771c36)
	 - [ ] Create a **Code.gs** file (if it's not already there) by choosing **Script** from the menu.
	 - [ ] Similarly, choose **HTML** and create the **Page.html** file.
	 - [ ] **Add the Script**: Copy the Apps Script code from the cloned repository or from this  **[link][JavaScript]** and paste it into the **Code.gs** file.
	 - [ ] **Add the HTML**: Copy the HTML code from the cloned repository or from this  **[link][html]** and paste it into the **Page.html** file.
4. Save the project by clicking the floppy disk icon 💾 on the top bar or pressing **Ctrl + S** (Windows) or **Command + S** (Mac).
5. Go back to your Google Sheet and refresh the page.
6. **Use the Extension**: The script will add **LEI2JSON** functionality to your Google Sheet, accessible from the menu bar.
7. **Authorise and Run**: Follow the prompts to grant necessary permissions for running **LEI2JSON**.

Now, you're all set to use **LEI2JSON** directly within your Google Sheet!
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
- [**Lihong Zheng**](https://researchoutput.csu.edu.au/en/persons/lzhengcsueduau) - Professor in Computer Science (Co-supervisor)

## Contributing
If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Acknowledgments
We acknowledge that this work originates from the Trakka project and builds on the existing TerraCipher Trakka implementation. We appreciate the support and resources provided by the Trakka project team. Also, we thank Dave Swain and Will Swain from TerraCipher for their guidance and assistance throughout **LEI2JSON**.


## License
This project is licensed under Apache License 2.0 - see the [LICENSE][lic] file for details.

## Contact
If you have any questions, suggestions or need assistance, please don't hesitate to contact us at mhabib@csu.edu.au, akabir@csu.edu.au.

## Citation

If you use this project in your research, please cite:

```bibtex
@article{HABIB2024101629,
title = {LEI2JSON: Schema-based validation and conversion of livestock event information},
journal = {SoftwareX},
volume = {26},
pages = {101629},
year = {2024},
issn = {2352-7110},
doi = {https://doi.org/10.1016/j.softx.2023.101629},
url = {https://www.sciencedirect.com/science/article/pii/S2352711023003254},
author = {Mahir Habib and Muhammad Ashad Kabir and Lihong Zheng}
}
```
Or:

**Habib, M., Kabir, M.A., & Zheng, L. (2024). _LEI2JSON: Schema-based validation and conversion of livestock event information_. SoftwareX, 26, 101629. [https://doi.org/10.1016/j.softx.2023.101629](https://doi.org/10.1016/j.softx.2023.101629)**

[//]: #
  [LEI2JSON]:  <https://docs.google.com/spreadsheets/d/1bY8gVCLbVUoGXgYd5DosBFXTjOZqGR4kK8yUstpqIBs/edit#gid=0>
  [lic]: <https://github.com/mahirgamal/LEI2JSON/blob/main/LICENSE>
  [html]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Page.html>
  [JavaScript]: <https://github.com/mahirgamal/LEI2JSON/blob/main/src/Code.gs>
 
