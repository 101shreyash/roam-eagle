-- migrate:up

ALTER TABLE property_info ADD COLUMN negotiable BOOLEAN NOT NULL;

-- migrate:down

