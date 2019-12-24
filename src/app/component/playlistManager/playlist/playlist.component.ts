import { Component, OnInit } from '@angular/core';
import {PlaylistInfor} from '../../../model/playlist/playlist-Infor';
import {PlaylistService} from '../../../services/playlistManager/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {Track} from 'ngx-audio-player';
import {Song} from '../../../model/song/song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
    song: Song[];
    msaapDisplayTitle = true;
    msaapDisplayPlayList = true;
    pageSizeOptions = [2, 4, 6];
    msaapDisplayVolumeControls = true;
    msbapDisplayTitle = false;
    msbapDisplayVolumeControls = true;
    playlist1: Track;
    playlist2: Track[] = [];
    msaapPlaylist2: Track[] = [];

  title = 'Danh Sách Bài Hát Trong PLaylist Của Tôi';

  playlist: PlaylistInfor;

  constructor(private playlistService: PlaylistService,
              private routes: ActivatedRoute) {
  }

  ngOnInit() {
    this.routes.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.playlistService.getPlayListById(id).subscribe(
          next => {
            this.playlist = next;
            console.log(next);
            this.song = next.songs;
            for (const song of this.song ) {
                this.playlist1 = {
                    title: song.nameSong,
                    link: song.mp3Url
                };
                this.playlist2.push(this.playlist1);
            }
            this.msaapPlaylist2 = this.playlist2;
          },
          error => {
            this.playlist = null;
            console.log(error);
          }
      );
    });
  }
    changeMsbapDisplayTitle(event) {
        this.msbapDisplayTitle = event.checked;
    }

    changeMsbapDisplayVolumeControls(event) {
        this.msbapDisplayVolumeControls = event.checked;
    }

    changeMsaapDisplayTitle(event) {
        this.msaapDisplayTitle = event.checked;
    }

    changeMsaapDisplayPlayList(event) {
        this.msaapDisplayPlayList = event.checked;
    }

    changeMsaapDisplayVolumeControls(event) {
        this.msaapDisplayVolumeControls = event.checked;
    }

}
