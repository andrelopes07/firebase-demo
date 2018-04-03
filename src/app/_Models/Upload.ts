export class Upload {
    id: string;
    file: File;
    name: string;
    url: string;
    size: number;
    progress?: number;
    createdAt: number;
  
    constructor(file: File) {
      this.file = file;
    }
  }