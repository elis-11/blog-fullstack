// we need image and setter function to change image
// additionally we want to allow user to place normal props like "className" or "onClick"
// this we do by merging out props with all allowed props for an HTML div component 

// input: 
  // image to display
  // setImage to change
  export const ImagePicker = ({ image, setImage, imageStyle, imageClassName, ...rest }) => {
  
    // when file was selected in dialog:
    // convert to base64 and pass it upwards!
    const onImageSelected = (e) => {
      // cancel if user has not picked a file
      if(!e.target.files || e.target.files.length === 0) return
  
      // convert file to data-uri string...
      const fileReader = new FileReader()
  
      // parse file into string
      fileReader.readAsDataURL(e.target.files[0])
  
      // once file was parsed into string => put into state
      // this will update the image in the UI!
      fileReader.onloadend = (e) => {
        if(!e.target || !e.target.result) return
  
        // put in state (=> change image in UI)
        setImage(e.target.result)
      }
    }
  
    // show image
    return (
      // with {...rest} we pass on all "standard props" the user has placed on the component. 
      // e.g. "onClick", "className", "style", etc 
      <div {...rest}>
        {/* label trick: 
        wrap the img element by label
        label is connected to file input element by ID
        when we click the image, this way it will also click the file input! and will open file dialog!  */}
        <label htmlFor="file-input" style={{ display: "block" }}>
          <img
            src={image} 
            className={imageClassName} 
            alt="logo" 
            // some base style => can be overwritten with imageStyle prop
            style={{ 
              cursor: 'pointer', 
              width: "100%", height: "100%", 
              objectFit: "cover", // keep aspect ratio of image (dont stretch :))
              ...imageStyle 
            }} 
          />
        </label>
        {/* INPUT FILE => will open the file picking dialog for us */}
        <input 
          id="file-input" 
          type="file" 
          accept="image/*" 
          onChange={ onImageSelected } 
          style={{ display: "none" }} 
        />
      </div>
    )
  
  }