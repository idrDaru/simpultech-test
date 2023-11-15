class RoomsController < ApplicationController
    def index
        @rooms = Room.all
        @room_form = Room.new
    end

    def show
        @rooms = Room.all
        @room = Room.find(params[:id])
        @room_form = Room.new
    end

    def create
        @room = Room.create(room_params)
        if @room.persisted?
            ActionCable.server.broadcast("rooms", @room)
        else
            render :new, status: :unprocessable_entity
        end
    end

    private
        def room_params
            params.require(:room).permit(:name)
        end
end
