<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect.'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->accessToken;

        return response(\compact('user', 'token'));

    }

    public function logout(Request $request)
    {
        $user = Auth::user()->token();
        $user->revoke();
        return response('', 204);
    }
}
