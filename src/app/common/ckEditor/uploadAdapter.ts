export default class Adapter {
    loader: any;
    config: any;
  
    constructor(loader: any, config: any) {
      this.loader = loader;
      this.config = config;
    }
  
    public async upload(): Promise<any> {
      const file = await this.loader.file;
      console.log(file);
      return this.uploadFile(file);
    }
  
    private async uploadFile(file: File): Promise<any> {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('http://18.221.67.89:4000/api/fileUpload', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ZjY0ODQ0NTJmNjU1NGJjN2Q4NTZjMiIsImlhdCI6MTcyOTQyNTQ1N30.qWr1t0mXbvLUX2iXwIOon0lDVTMpR_v9c32hxvYLc4c'
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('File upload failed');
        }
  
        const result = await response.json();
        console.log(result);
  
        // Assuming the response contains a 'url' field with the uploaded image URL
        return {
          default: result.data?.imageUrl // Return the image URL here
        };
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  
    abort() {
      // Add abort logic if needed
    }
  }
  
  