-- migrate:up

ALTER TABLE user_info
DROP COLUMN native_language;

-- migrate:down
