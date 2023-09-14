import 'dart:io';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'File Upload App',
      home: FileUploadScreen(),
    );
  }
}

class FileUploadScreen extends StatefulWidget {
  @override
  _FileUploadScreenState createState() => _FileUploadScreenState();
}

class _FileUploadScreenState extends State<FileUploadScreen> {
  File? _selectedFile; // Make _selectedFile nullable
  String _uploadMessage = '';

  Future<void> _pickAndUploadFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(); // Make result nullable

    if (result != null) {
      File file = File(result.files.single.path!); // Use null assertion operator (!)
      setState(() {
        _selectedFile = file;
      });

      // Replace with your file upload API endpoint
      String uploadUrl = 'https://example.com/upload';

      var request = http.MultipartRequest('POST', Uri.parse(uploadUrl))
        ..files.add(
          http.MultipartFile(
            'file',
            file.readAsBytes().asStream(),
            file.lengthSync(),
            filename: file.path.split('/').last,
          ),
        );

      try {
        http.StreamedResponse response = await request.send();
        if (response.statusCode == 200) {
          setState(() {
            _uploadMessage = 'File uploaded successfully!';
          });
        } else {
          setState(() {
            _uploadMessage = 'File upload failed with status ${response.statusCode}';
          });
        }
      } catch (e) {
        setState(() {
          _uploadMessage = 'Error uploading file: $e';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('File Upload App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: _pickAndUploadFile,
              child: Text('Choose and Upload File'),
            ),
            SizedBox(height: 20),
            if (_selectedFile != null)
              Text(
                'Selected File: ${_selectedFile!.path}',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            SizedBox(height: 20),
            Text(_uploadMessage, style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
