package com.example.server.controller;

import com.example.server.model.Following;
import com.example.server.service.FollowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/following/")
public class FollowingController {

    @Autowired
    FollowingService followingService;

    @GetMapping
    public Iterable<Following> getFollowed() {
        return followingService.getFollowed();
    }

    @GetMapping("{id}")
    public Iterable<Following> getFollowedByUserId(@PathVariable Long id) {
        return followingService.getFollowedByUserId(id);
    }

    @PatchMapping
    public Following updateFollowed(@RequestBody Following id) {
        return followingService.follow(id);
    }

    @DeleteMapping("{id}")
    public HttpStatus unFollow(@PathVariable Long id) {
        return followingService.unFollow(id);
    }
}
