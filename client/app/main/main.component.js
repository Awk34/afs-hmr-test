import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { SocketService } from '../../components/socket/socket.service';

@Component({
  selector: 'main',
  template: require('./main.html'),
  styles: [require('./main.scss')],
})
export class MainComponent {
  Http;
  SocketService;
  awesomeThings = [];
  newThing = '';

  static parameters = [Http, SocketService];
  constructor(_Http_, _SocketService_) {
    this.Http = _Http_;
    this.SocketService = _SocketService_;

    console.log('asdf')
  }

  ngOnInit() {
    this.Http.get('/api/things')
      .map(res => res.json()
        // this.SocketService.syncUpdates('thing', this.awesomeThings);
      )
      .catch(err => Observable.throw(err.json().error || 'Server error'))
      .subscribe(things => {
        this.awesomeThings = things;
      });
  }


  ngOnDestroy() {
    this.SocketService.unsyncUpdates('thing');
  }

  addThing() {
    if(this.newThing) {
      this.Http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}
