package com.example.server.model;

import com.example.server.utils.UserRole;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "profile_image_id_unique",
                        columnNames = "profileImageId"
                )
        }
)
public class User implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;


    private String name;
    private String username;
    private String pronouns;
    private String biography;
    private String links;


    @Column
    private String email;

    @Column
    private String password;

    @Column(
            unique = true
    )
    private String profileImageId;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private Long posts = 0L;
    private Long followers = 0L;
    private Long following = 0L;

    private Boolean closed = true;
    private Boolean locked = false;
    private Boolean enabled = false;

    @OneToMany(
            targetEntity = Post.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Post> post;

    @OneToMany(
            targetEntity = Following.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Following> followed;

    public User(String name,
                String username,
                String pronouns,
                String biography,
                String links,
                String email,
                String password,
                UserRole userRole) {
        this.name = name;
        this.username = username;
        this.pronouns = pronouns;
        this.biography = biography;
        this.links = links;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

    public User(String name,
                String username,
                String pronouns,
                String biography,
                String links,
                String email,
                String password,
                String profileImageId,
                UserRole userRole) {
        this(name, username, pronouns, biography, links, email, password, userRole);
        this.profileImageId = profileImageId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(userRole.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() { return email; }

    public String getProfileImageId() {
        return profileImageId;
    }

    public void setProfileImageId(String profileImageId) {
        this.profileImageId = profileImageId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", pronouns='" + pronouns + '\'' +
                ", biography='" + biography + '\'' +
                ", links='" + links + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profileImageId='" + profileImageId + '\'' +
                ", userRole=" + userRole +
                ", posts=" + posts +
                ", followers=" + followers +
                ", following=" + following +
                ", closed=" + closed +
                ", locked=" + locked +
                ", enabled=" + enabled +
                ", post=" + post +
                ", followed=" + followed +
                '}';
    }
}