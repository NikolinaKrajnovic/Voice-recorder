import React ,{ Component } from 'react';
import "../../styles/record.css";
import Timer from "../timer/timer";
import firebase from '../../firebase';
import storage from '../../firebase';
import { ReactMic } from "react-mic";

class Record extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            record: false,
           // downUrl: ''
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
    
    onData(recordedBlob) {}
    
    onStop(recordedBlob) {
        
        let date = new Date();
        let timeNow = date.toLocaleTimeString();
        const blobRef = storageRef.child(`audio/${timeNow}.mp3`);
        
        try {
            blobRef.put(recordedBlob.blob).then(function(snapshot) {
                console.log(recordedBlob.blob)
                storage.ref('audio').child(timeNow + '.mp3')
                alert("Recorder Success!!!");
                console.log("Upload MP3 to firebase");
                storage.ref('audio').child(timeNow + '.mp3').getDownloadURL()
                .then((url) =>  //this.setState({downUrl:url}),
                console.log(url));
            });
        } 
        catch (e) {
            console.log(e);
        }
    }
    
    render() { 
        return(
            <div>
            <Timer begin={this.state.record} />
            <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#282c34"
            />
            <div>
            <button
            onClick={this.startRecording}
            disabled={this.state.record}
            type="button"
            >
            Start
            </button>
            <button
            onClick={this.stopRecording}
            disabled={!this.state.record}
            type="button"
            >
            Stop
            </button>
            </div>
            <div>
            <audio controls src={'this.state.downUrl'}></audio>
            </div>
            </div>
            );
        }
    }
    
    export default Record;