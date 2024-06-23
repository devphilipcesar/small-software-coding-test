# Create new expo app with 3 nav buttons at the bottom containing 3 main views:

- home (default view, just put text “home” in the view)
- chat (this is the view you will be working in)
- profile (just put text “profile” in the view)

In the chat view, show list of channels, with a search bar at the top. When you select a channel, go into the channel view, and show messages in this channel. Again with a search bar at the top.

Use react-query, or redux toolkit query to handle fetching/state. Filter channels or messages based on search. Here’s the JSON to use for this task:

```
{
  "channels": [
    {
      "id": "hslgk938384",
      "name": "#general",
      "members": [
        {
          "id": "lsdgh8394304",
          "name": "Alice Johnson"
        },
        {
          "id": "lkh449454",
          "name": "Bob Smith"
        },
        {
          "id": "ksjf8938dj",
          "name": "Charlie Brown"
        }
      ],
      "messages": [
        {
          "id": "49ghr88df8gf",
          "content": "<p>Hey everyone, how was your weekend?</p>",
          "text": "Hey everyone, how was your weekend?",
          "user_id": "lsdgh8394304"
        },
        {
          "id": "4lkhg9r888fh",
          "content": "<p>It was great, Alice! I went hiking. How about you?</p>",
          "text": "It was great, Alice! I went hiking. How about you?",
          "user_id": "lkh449454"
        },
        {
          "id": "83jfje939fj",
          "content": "<p>Spent some time with family. We had a BBQ.</p>",
          "text": "Spent some time with family. We had a BBQ.",
          "user_id": "ksjf8938dj"
        }
      ]
    },
    {
      "id": "kdlr937494",
      "name": "#project_discussion",
      "members": [
        {
          "id": "lsdgh8394304",
          "name": "Alice Johnson"
        },
        {
          "id": "ksjf8938dj",
          "name": "Charlie Brown"
        },
        {
          "id": "qowiue983",
          "name": "Diana Prince"
        }
      ],
      "messages": [
        {
          "id": "9r8fh4938fj",
          "content": "<p>Can someone help me with the project report?</p>",
          "text": "Can someone help me with the project report?",
          "user_id": "lsdgh8394304"
        },
        {
          "id": "8fh3jkl4h9f",
          "content": "<p>Sure, Alice. What do you need help with?</p>",
          "text": "Sure, Alice. What do you need help with?",
          "user_id": "ksjf8938dj"
        },
        {
          "id": "fj3k4jkl45h",
          "content": "<p>I can review it for you if you want.</p>",
          "text": "I can review it for you if you want.",
          "user_id": "qowiue983"
        }
      ]
    },
    {
      "id": "pwue9834598",
      "name": "#meeting_reminders",
      "members": [
        {
          "id": "lkh449454",
          "name": "Bob Smith"
        },
        {
          "id": "ksjf8938dj",
          "name": "Charlie Brown"
        },
        {
          "id": "bvncm39483",
          "name": "Emily Davis"
        }
      ],
      "messages": [
        {
          "id": "gh94k3lk45j",
          "content": "<p>Don't forget about the meeting at 3 PM.</p>",
          "text": "Don't forget about the meeting at 3 PM.",
          "user_id": "lkh449454"
        },
        {
          "id": "0fj39kfljs8",
          "content": "<p>Thanks for the reminder, Bob.</p>",
          "text": "Thanks for the reminder, Bob.",
          "user_id": "ksjf8938dj"
        },
        {
          "id": "kd9fj3kl4fj",
          "content": "<p>I'll be there. I have some updates to share.</p>",
          "text": "I'll be there. I have some updates to share.",
          "user_id": "bvncm39483"
        }
      ]
    }
  ]
}
```
