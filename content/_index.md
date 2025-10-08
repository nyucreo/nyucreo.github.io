---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

sections:
  # - block: hero
  #   id: latest-news
  #   content:
  #       html: '{{< news_ticker >}}'

  - block: markdown
    content:
      title: ""
      subtitle: ""
      text: |
        {{< slider >}}

    design:
      columns: "1"
      spacing:
        padding: ["0", "0", "0", "0"]
        margin: ["0", "0", "40px", "0"]

  - block: hero
    content:
      title: |
        Wowchemy
        Research Group
      image:
        filename: welcome.jpg
      text: |
        <br>
        The **Wowchemy Research Group** has been a center of excellence for Artificial Intelligence research, teaching, and practice since its founding in 2016.

  - block: markdown
    content:
      title: ""
      text: |
        <div class="row mb-5">
          <div class="col-md-6">
            <h2 style="color:#2c3e50;border-bottom:3px solid #520c8c;padding-bottom:.5rem;margin-bottom:1.5rem;font-size: 2rem;">Latest News</h2>
            {{< news-list count="3" >}}
          </div>
          <div class="col-md-6">
            <h2 style="color:#2c3e50;border-bottom:3px solid #520c8c;padding-bottom:.5rem;margin-bottom:1.5rem;font-size: 2rem;">Upcoming Events</h2>
            {{< event-list count="4" >}}
          </div>
        </div>
    design:
      columns: "1"


  - block: markdown
    content:
      title: "Research Groups"
      text: |
        {{< group-list columns="3" count="20" sort_by="title" order="asc" >}}
    design:
      columns: "1"


  - block: people
    content:
      title: Director
      user_groups:
          - Director
      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_social: true

  - block: collection
    content:
      title: "Latest Preprints"
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: "article"
    design:
      view: citation
      columns: "1"
---

