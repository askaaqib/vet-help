import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaHandler from './MediaHandler';
import Pusher from 'pusher-js';
import Peer from 'simple-peer';

const APP_KEY = '92e8a4cbd51aaee54132';

class RequestHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMedia: false,
            otherUserid: null
          }
        this.mediaHandler = new MediaHandler();

        this.user = {id:'1', name: 'hassaan'}

        this.setupPusher();

        this.callTo = this.callTo.bind(this);
        this.setupPusher = this.setupPusher.bind(this);
        this.startPeer = this.startPeer.bind(this);
    }

    componentWillMount() {
        this.mediaHandler.getPermissions()
            .then((stream) => {
                this.setState({hasMedia:true});

                try {
                    this.myVideo.srcObject = stream;
                  } catch (e) {
                    this.myVideo.src = window.URL.createObjectURL(stream);
                  }

                this.myVideo.play();
            })
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    setupPusher() {
        this.pusher = new Pusher(APP_KEY, {
            authEndpoint: '/api/pusher/auth',
            cluster: 'ap2',
            auth: {
                params: this.user.id,
            }
        });

        this.channel = this.pusher.subscribe('presence-video-channel');

        this.channel.bind(`client-signal-${this.user.id}`, (signal) => {
            let peer = this.peers[signal.userId];

            // if peer is not already exists, we got an incoming call
            if(peer === undefined) {
                this.setState({otherUserId: signal.userId});
                peer = this.startPeer(signal.userId, false);
            }

            peer.signal(signal.data);
        });
    }

    startPeer(userId, initiator = true) {
        const peer = new Peer({
            initiator,
            stream: this.user.stream,
            trickle: false
        });

        peer.on('signal', (data) => {
            this.channel.trigger(`client-signal-${userId}`, {
                type: 'signal',
                userId: this.user.id,
                data: data
            });
        });

        peer.on('stream', (stream) => {
            try {
                this.userVideo.srcObject = stream;
            } catch (e) {
                this.userVideo.src = URL.createObjectURL(stream);
            }

            this.userVideo.play();
        });

        peer.on('close', () => {
            let peer = this.peers[userId];
            if(peer !== undefined) {
                peer.destroy();
            }

            this.peers[userId] = undefined;
        });

        return peer;
    }

    callTo(userId) {
        this.peers[userId] = this.startPeer(userId);
    }

    render() { 
        {[1,2,3,4].map((userId) => {
            return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
        })}

        return ( 
            <div className="main-dasboard">
              <div className="container mt-5">
                <div className="card dash-main-card">
                    <div className="video-container">
                        <video className="my-video" ref={(ref) => {this.myVideo = ref;}}></video>              
                        <video className="user-video" ref={(ref) => {this.userVideo = ref;}}></video>    
                    </div>          
                </div>
              </div>
            </div>
         );
    }
}


 
RequestHelp.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps)(RequestHelp)