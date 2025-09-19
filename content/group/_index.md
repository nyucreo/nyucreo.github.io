---
title: Research Groups
date: 2022-10-24
type: landing

sections:
  - block: hero
    content:
      title: Research Groups
      text: |
        Discover our interdisciplinary research teams and their cutting-edge work.
    design:
      background:
        image:
          filename: coders.jpg
          filters:
            brightness: 0.4
        gradient_start: '#1e3a8a'
        gradient_end: 'rgba(30, 58, 138, 0.8)'
        text_color_light: true
      spacing:
        padding: ['60px', '0', '60px', '0']

  - block: collection
    content:
      title: ""
      count: 20
      filters:
        folders: ["group"]
      sort_by: title
      order: asc
    design:
      view: card
      columns: 3
      show_summary: false
      show_date: false
      show_tags: false
      show_authors: false
      css_class: group
      card:
        style: overlay
        text_align: left
        show_subtitle: true
    id: research-groups
---