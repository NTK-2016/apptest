import React, {Component} from 'react'

class BackgroundImg extends React.Component {
    constructor() {
        super();
        this.state = {
            backgroundImage: '',imagePreviewUrl:''
           
        }
 
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    }
    _handleSubmit(e) {
        e.preventDefault();
    
        console.log('handle uploading-', this.state.file);
      }
    handleBackgroundChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0] ;
        reader.onloadend = () => {
            this.setState({
              backgroundImage: file,
              imagePreviewUrl: reader.result
            });
        }
     
        reader.readAsDataURL(file)
    }
    
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText"></div>);
        }
    
        return (
          <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" 
                type="file" 
                onChange={(e)=>this.handleBackgroundChange(e)} style={{ backgroundColor: "#03A595",color: "#fff",minHeight: "35px" ,padding: "10px",border: "none",borderRadius: "5px"}}/>
              <button className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)} style={{ margin: "3em auto",backgroundColor: "#EDEDED",border: "1px solid #DFDFDF",borderRadius: "5px",maxWidth:"300px"  }}>Upload Image</button>
            </form>
            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
        )
      }
}
export default BackgroundImg;