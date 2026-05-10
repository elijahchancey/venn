# TODOs

Items deferred from the engineering review. Must be resolved before expanding beyond the initial two-person prototype.

## Before public sharing

- [ ] **Disconnect Reddit / delete account**: Add a way for users to revoke Venn's Reddit access and delete their account + subreddit data. Also handle the reverse case: if a user revokes Venn's access from Reddit's own settings (reddit.com/prefs/apps), Venn should detect the next 401-on-refresh and show a "reconnect" prompt rather than silently producing an empty comparison. Currently out of scope for v1.

## Before v2

- [ ] **Past comparisons: snapshot vs live recompute**: `/dashboard` currently recomputes the comparison live on each click (re-fetching from `reddit_connections`). Decide whether past comparisons should be a live recompute (always current, but subreddits may have changed since the original view) or a snapshot (captures the moment of first overlap, but requires storing results). Decide before v2 to avoid a migration.
