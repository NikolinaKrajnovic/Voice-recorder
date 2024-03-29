import React ,{ Component } from 'react';
import "../../styles/recorder.css";
import Time from "../time/time";
import storage from '../../firebase';
import { ReactMic } from "react-mic";

class Recorder extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            record: false,
           downUrl: ''
        }
        
    }

    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };
    

    onStop = async (recordedBlob) => {
        let storageRef =storage.ref();
        let date = new Date();
        let timeNow = date.toLocaleTimeString();
        const blobRef = storageRef.child(`audio/${timeNow}.mp3`);
        let URL = '';
        
        try {
            
            await blobRef.put(recordedBlob.blob).then(async (snapshot) => {
                console.log(recordedBlob.blob)
                storage.ref('audio').child(timeNow + '.mp3')
                alert("Recorder Success!!!");
                console.log("Upload MP3 to firebase");

                await storage.ref('audio').child(timeNow + '.mp3').getDownloadURL()
                .then((url) => {
                    console.log('url', url);
                   
                    URL = url
                });
            });

            console.log('URL', URL);
            
            this.setState({
                downUrl: URL
            });
            
        } 
        catch (e) {
            console.log(e);
        }

        
    }
    
    render() { 
        return(
            <div className="container-fluid">
                <div className="time">
            <Time begin={this.state.record} />
            </div>
            <br/>
            <br/>
            <br/>
            <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="red"
            backgroundColor="black"
            />
            <div>
           <div className ="start"
            onClick={this.startRecording}
            disabled={this.state.record}>
           <i style={{fontSize:"50px"}} className="fa fa-microphone"></i>
           </div>
           <div className ="stop"
            onClick={this.stopRecording}
            disabled={!this.state.record}>
            <i  style={{fontSize:"95px"}} className="fa fa-stop-circle"></i>
            </div>
            </div>
            <div>
            <audio controls src={this.state.downUrl}></audio>
            {/* {this.state.downUrl || 'no url'} */}
            </div>
            <br/>
            <br/>
            <br/>
            </div>
            );
        }
    }
    
    export default Recorder;