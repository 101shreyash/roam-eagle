-- migrate:up

ALTER TABLE property_visual ALTER COLUMN property_video_url DROP NOT NULL;


-- migrate:down

