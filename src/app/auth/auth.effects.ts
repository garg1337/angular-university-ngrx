import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mapTo, tap } from "rxjs/operators";
import { AppActions } from "../action-types";
import { AuthActions } from "./action-types";
import { User } from "./model/user.model";

@Injectable()
export class AuthEffects {
    readonly login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        tap(action =>
            localStorage.setItem('user', JSON.stringify(action.user)))),
        { dispatch: false });

    readonly logout$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            })),
        { dispatch: false });

        readonly appInitd$ = createEffect(
            () => this.actions$.pipe(
                ofType(AppActions.appInitalized),
                map(() => {
                    const userJson = localStorage.getItem('user');
                    if (!userJson) {
                        return AuthActions.localStorageUserLoaded({user: undefined});
                    }
                    return AuthActions.localStorageUserLoaded({user: JSON.parse(userJson)});
                }),
            ));    

    constructor(private actions$: Actions, private router: Router) {
    }
}