# PubLEIsh: _Pub_lishing Livestock Event Information for Data Sharing

## _Introduction_
The CSV Publisher is a tool that enables livestock producers to manage their livestock event data efficiently by publishing it in CSV format. The tool uses a Google Spreadsheet as an interface, allowing producers to enter data into a familiar tool, reducing the learning curve for new applications.

The application uses a message broker, such as RabbitMQ, enabling real-time data sharing with consumers, and improving the data flow and connections between producers and consumers. The CSV publisher can be integrated with other software, such as data analysis tools or data visualisation software.

## _Tech_
- [html] - HTML for front end.
- [JavaScript] - Javascript for back end
- [RabbitMQ] - RabbitMQ for message broker

## _Getting Started_
To use the CSV Publisher, you will need to have access to the Google Spreadsheet that contains your livestock event data. You can access the spreadsheet through the following link: [CSV Publisher][csv]

## _Contributing_
If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## _License_
This project is licensed under Apache License 2.0 - see the [LICENSE][lic] file for details.

[//]: #
  [csv]:  <https://docs.google.com/spreadsheets/d/1SOqi-JuGV21YAHhK24SDBsRlO907d_GajVn9nqFKq4Q/edit#gid=0>
  [lic]: <https://github.com/mahirgamal/csv-publisher/blob/main/LICENSE>
  [html]: <https://github.com/mahirgamal/csv-publisher/blob/main/src/Page.html>
  [JavaScript]: <https://github.com/mahirgamal/csv-publisher/blob/main/src/Code.gs>
  [RabbitMQ]: <https://www.rabbitmq.com/>
