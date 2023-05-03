from googleapiclient.discovery import build
import json
import sys

api_key = 'AIzaSyB9CFZ7J5OgVaFTf4ubhddZTxH5SXjF5PQ'
youtube = build('youtube', 'v3', developerKey=api_key)

video_id = sys.argv[1]

comments = []
final_comments = []
next_page_token = None
while True:
    # Retrieve comments for the video
    response = youtube.commentThreads().list(
        part='snippet',
        videoId=video_id,
        maxResults=100,
        pageToken=next_page_token
    ).execute()

    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']['textOriginal']
        comments.append(comment)

    next_page_token = response.get('nextPageToken')
    if not next_page_token:
        break

for comment in comments:
    final_comments.append(comment.encode('utf-8').decode('utf-8'))

final_comments_json = json.dumps(final_comments)
print(final_comments_json)
