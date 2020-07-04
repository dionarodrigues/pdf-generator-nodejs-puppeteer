interface Request {
  file: any;
}

class ImageController {
  public async execute({ file }: Request): Promise<any> {
    try {
      return { path: `http://localhost:3333/uploads/images/${file.filename}` }
    } catch (e) {
      console.log('Error', e);
    }
  }
}

export default ImageController;
