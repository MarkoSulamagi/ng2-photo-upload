import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app/app';


bootstrap(AppComponent, [
    HTTP_PROVIDERS,
]).catch(err => console.error(err));

provide('config', { useValue: {
    uploadUrl: 'http://app.test.rentmarket.eu/api/v2/photos?api_key=51e49f86b497f78c1247d9124f25cd2d'
}});