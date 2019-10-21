import React, {Component} from 'react';
import axios from 'axios';

class AddAvatar extends Component {

    constructor(props) {
        console.log("AVATAR SITE")
        super(props)
        this.state = {
             image: null
        }
    }

    setImage(img) {
        this.setState({ image: img })
        const files = Array.from(img.target.files)
        console.log(files)
    }

    async submit() {
        console.log(this.state.image)
    }

    render() {
        return(
            <div className="container">
                <div className="form-group">
                    <label htmlFor="picture">
                        Select an image
                    </label>
                    <input type="file" name="picture" className="form-control-file" id="picture" onChange = { e => { this.setImage(e) } } />
                </div>
            </div>
        )
    }
}

export default AddAvatar